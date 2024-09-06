export const BC_CUSTOMER_TABLE = {
  name: 'customer',
  cols: {
    // the other cols is auto filled wit the data from business central API
    isSynced: { name: 'isSynced' }
  }
};

export const BC_TOKEN_TABLE = {
  name: 'tokens',
  cols: {
    token: { name: 'token' }
  }
};

export const BC_SYNCHRONIZATION_TABLE = {
  name: 'synchronization',
  cols: {
    time: { name: 'time' },
    table: { name: 'table' },
    source: { name: 'source' },
    target: { name: 'target' }
  }
};

export const BUSINESS_CENTRAL_DATABASE = {
  name: 'business_central',
  tables: {
    BC_CUSTOMER_TABLE,
    BC_TOKEN_TABLE,
    BC_SYNCHRONIZATION_TABLE
  }
};

export type SynchronizationSource = 'remote' | 'locale';

export interface BcSynchronizationTable {
  time: string;
  table: string;
  source: string;
  target: string;
}
