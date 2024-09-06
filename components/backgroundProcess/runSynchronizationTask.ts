import { BcTokenResponse, fetchBcToken } from '@/api/businessCentral/fetchBcToken';
import { BUSINESS_CENTRAL_DATABASE, localStore } from '../tinyBase/StoreProvider';
import { fetchBc } from '@/api/businessCentral/fetchBc';
import { CustomerFetchResponse } from '@/api/businessCentral/useBcCustomers';

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
  localStore.setRow(BUSINESS_CENTRAL_DATABASE.tables.tokens.name, 'main_token', {
    [BUSINESS_CENTRAL_DATABASE.tables.tokens.rows.token.name]: bcToken.access_token
  });
  return bcToken;
};

const syncBcCustomers = async (bcToken: BcTokenResponse) => {
  // ? if the local customer storage is empty

  const hasCustomerTable = localStore.hasTable(BUSINESS_CENTRAL_DATABASE.tables.customers.name);

  if (!hasCustomerTable) {
    // ? if empty do initial synchronization (fetch all data from BC)
    console.log('Initial BC Customers synchronization is running');

    const bcCustomer = await fetchBc<CustomerFetchResponse>({
      token: bcToken.access_token,
      endPoint: `/customers`
    });

    bcCustomer?.value.forEach((customer, index) => {
      localStore.setRow(BUSINESS_CENTRAL_DATABASE.tables.customers.name, customer.id, {
        ...customer,
        isSynced: true
      });
    });
  } else {
    // ? if not empty do the post synchronization (fetch all data from BC from last synchronization time)
    console.log('BC Customer Synchronization is running');
  }

  // console.log('this is the business central customer', bcCustomer);
};
