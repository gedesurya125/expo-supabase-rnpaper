import { BcTokenResponse, fetchBcToken } from '@/api/businessCentral/fetchBcToken';
import { localStore } from '../tinyBase/StoreProvider';
import { fetchBc } from '@/api/businessCentral/fetchBc';
import { CustomerFetchResponse } from '@/api/businessCentral/useBcCustomers';
import {
  BC_CUSTOMER_TABLE,
  BC_SYNCHRONIZATION_TABLE,
  BC_TOKEN_TABLE,
  BcSynchronizationTable,
  BUSINESS_CENTRAL_DATABASE,
  SynchronizationSource
} from '../tinyBase/businessCentralDatabaseSchema';
import { BcCustomer } from '@/api/businessCentral/types/customer';
import { Row } from 'tinybase/store';
import { createQueries } from 'tinybase/queries';

export const runSynchronizationTask = async () => {
  try {
    const bcToken = await getAndStoreBCToken();
    if (!bcToken?.access_token) throw new Error('Missing Bc Token');
    await syncBcCustomers(bcToken);
  } catch (error) {
    console.log(error);
  }
};

const getAndStoreBCToken = async () => {
  console.log('Syncing BcToken');
  const bcToken = await fetchBcToken();

  localStore.setRow(BC_TOKEN_TABLE.name, 'main_token', {
    [BC_TOKEN_TABLE.cols.token.name]: bcToken.access_token
  });
  return bcToken;
};

const syncBcCustomers = async (bcToken: BcTokenResponse) => {
  const hasCustomerTable = localStore.hasTable(BC_CUSTOMER_TABLE.name);
  if (!hasCustomerTable) {
    await runInitialCustomersSynchronization(bcToken.access_token);
  } else {
    await runPostCustomerSynchronization(bcToken.access_token);
  }
};

const runInitialCustomersSynchronization = async (token: string) => {
  console.log('Initial BC Customers synchronization is running');
  const bcCustomerResponse = await fetchBc<CustomerFetchResponse>({
    token: token,
    endPoint: `/customers`
  });
  fetchAndSynchronizeRemoteCustomerAndLocalCustomer(token, bcCustomerResponse);
};

const runPostCustomerSynchronization = async (token: string) => {
  await synchronizeRemoteCustomerToLocal(token);
  await synchronizeLocalCustomerToRemote(token);
};

const synchronizeRemoteCustomerToLocal = async (token: string) => {
  const lastSynchronizationTime = localStore.getCell(
    BC_SYNCHRONIZATION_TABLE.name,
    '0',
    BC_SYNCHRONIZATION_TABLE.cols.time.name
  );

  const unsynchronizedRemoteCustomerDataResponse = await fetchBc<CustomerFetchResponse>({
    token: token,
    endPoint: `/customers?$filter=lastModifiedDateTime gt ${lastSynchronizationTime}`
  });
  fetchAndSynchronizeRemoteCustomerAndLocalCustomer(
    token,
    unsynchronizedRemoteCustomerDataResponse
  );
  console.log('UNSYNC CUSTOMER DATA', {
    unsynchronizedRemoteCustomerDataResponse,
    lastSynchronizationTime
  });
};

const synchronizeLocalCustomerToRemote = async (token: string) => {
  const localCustomers = localStore.getTable(BC_CUSTOMER_TABLE.name);
  const unsynchronizedLocalCustomer = Object.entries(localCustomers).filter(
    ([rowId, row]) => row?.isSynced === false //! should be changed to false latter
  );

  if (unsynchronizedLocalCustomer?.length > 0) {
    // TODO: run push local unsynchronized data to remote data
    await Promise.all(
      unsynchronizedLocalCustomer.map(async ([rowId, row]) => {
        const isExistingData = row?.id;
        if (isExistingData) {
          // ? Update the BC Data
          return await updateSingleLocalCustomerToRemote(token, row as BcCustomer);
        } else {
          return await writeLocalCustomersToRemote(token, row as BcCustomer);
          // ? Create new data to the Business central and then use the response to write back the data into local Database. Then remove the old data that has not BC_ID
        }
      })
    );
  }
  console.log('THIS IS THE LOCAL CUSTOMER TABLE TO BE SYNC', unsynchronizedLocalCustomer);
};

const updateSingleLocalCustomerToRemote = async (token: string, customerData: BcCustomer) => {
  const dataForUpdate = { ...customerData };
  delete dataForUpdate.id;
  delete dataForUpdate.lastModifiedDateTime;
  delete dataForUpdate['@odata.context'];
  delete dataForUpdate['@odata.etag'];
  delete dataForUpdate.isSynced;
  delete dataForUpdate?.balanceDue;
  delete dataForUpdate?.taxAreaDisplayName;

  const response = await fetchBc<BcCustomer>({
    token,
    endPoint: `/customers(${customerData.id})`,
    options: {
      method: 'PATCH',
      headers: {
        'If-Match': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataForUpdate)
    }
  });
  console.log('THIS IS THE UPDate response', { response });
};
const writeLocalCustomersToRemote = async (token: string, customerData: BcCustomer) => {}; //TODO: continue

const fetchAndSynchronizeRemoteCustomerAndLocalCustomer = async (
  token: string,
  customerFetchResponse?: CustomerFetchResponse | null
) => {
  if (!(customerFetchResponse?.value && customerFetchResponse?.value?.length > 0)) return null;

  const bcCustomers = customerFetchResponse?.value;

  await Promise.all(
    bcCustomers.map(async (customer) => {
      // TODO: before setRow, we need to compare if local data is newer than the remote data
      if (!customer?.id) return null;
      const currentLocalData = localStore.getRow(BC_CUSTOMER_TABLE.name, customer.id);

      console.log('this is the currentLocaldata', currentLocalData);

      if (Object.keys(currentLocalData)?.length === 0) {
        return writeSingleRemoteCustomerToLocalData(customer);
      }

      const currentLocalDataModifiedTime = new Date(
        currentLocalData?.lastModifiedDateTime as string
      );
      const remoteDataModifiedTime = new Date(customer?.lastModifiedDateTime!);

      if (remoteDataModifiedTime > currentLocalDataModifiedTime) {
        return writeSingleRemoteCustomerToLocalData(customer);
      } else {
        return await updateSingleLocalCustomerToRemote(token, currentLocalData as BcCustomer);
      }
    })
  );
  writeSynchronizationRecord({
    table: BC_CUSTOMER_TABLE.name,
    source: 'remote',
    target: 'locale'
  });
};

const writeSingleRemoteCustomerToLocalData = (customer: BcCustomer) => {
  localStore.setRow(BC_CUSTOMER_TABLE.name, customer.id!, {
    ...customer,
    [BC_CUSTOMER_TABLE.cols.isSynced.name]: true
  });
};

const writeSynchronizationRecord = ({
  table,
  source,
  target
}: {
  table: string;
  source: SynchronizationSource;
  target: SynchronizationSource;
}) => {
  localStore.setRow(BC_SYNCHRONIZATION_TABLE.name, '0', {
    table,
    time: new Date().toISOString(),
    source,
    target
  });
};
