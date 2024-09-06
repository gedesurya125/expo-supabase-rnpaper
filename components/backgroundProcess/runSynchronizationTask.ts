import { BcTokenResponse, fetchBcToken } from '@/api/businessCentral/fetchBcToken';
import { localStore } from '../tinyBase/StoreProvider';
import { fetchBc } from '@/api/businessCentral/fetchBc';
import { CustomerFetchResponse } from '@/api/businessCentral/useBcCustomers';
import {
  BC_CUSTOMER_TABLE,
  BC_SYNCHRONIZATION_TABLE,
  BC_TOKEN_TABLE,
  BcSynchronizationTable,
  SynchronizationSource
} from '../tinyBase/businessCentralDatabaseSchema';
import { BcCustomer } from '@/api/businessCentral/types/customer';
import { Row } from 'tinybase/store';

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
  // ? if the local customer storage is empty

  const hasCustomerTable = localStore.hasTable(BC_CUSTOMER_TABLE.name);

  if (!hasCustomerTable) {
    // ? if empty do initial synchronization (fetch all data from BC)
    console.log('Initial BC Customers synchronization is running');

    const bcCustomer = await fetchBc<CustomerFetchResponse>({
      token: bcToken.access_token,
      endPoint: `/customers`
    });
    if (bcCustomer?.value) {
      writeCustomersToLocalStore(bcCustomer?.value);
      writeSynchronizationRecord({
        table: BC_CUSTOMER_TABLE.name,
        source: 'remote',
        target: 'locale'
      });
    }
  } else {
    // ? if not empty do the post synchronization (fetch all data from BC from last synchronization time)
    console.log('BC Customer Synchronization is running');
  }
};

const writeCustomersToLocalStore = (bcCustomers: BcCustomer[]) => {
  bcCustomers.forEach((customer) => {
    localStore.setRow(BC_CUSTOMER_TABLE.name, customer.id, {
      ...customer,
      [BC_CUSTOMER_TABLE.cols.isSynced.name]: true
    });
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
  localStore.addRow(BC_SYNCHRONIZATION_TABLE.name, {
    table,
    time: new Date().toISOString(),
    source,
    target
  });
};
