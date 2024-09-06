import { fetchBcToken } from '@/api/businessCentral/fetchBcToken';
import { BUSINESS_CENTRAL_DATABASE, localStore } from '../tinyBase/StoreProvider';

export const runSynchronizationTask = async () => {
  const bcToken = await getAndStoreBCToken();
};

const getAndStoreBCToken = async () => {
  console.log('Syncing BcToken');

  try {
    const bcToken = await fetchBcToken();
    localStore.setRow(BUSINESS_CENTRAL_DATABASE.tables.tokens.name, 'main_token', {
      [BUSINESS_CENTRAL_DATABASE.tables.tokens.rows.token.name]: bcToken.access_token
    });
    return bcToken;
  } catch (error) {
    return null;
  }
};
