import { useFetchBc } from './useFetchBc';
import { BcSalesOrder } from './types/bcSalesOrder';

export const useBcSalesOrders = () => {
  return useFetchBc<BcSalesOrdersResponse>({
    queryKey: ['bc-sales-orders'],
    fetchProps: {
      endPoint: `/salesOrders`
    }
  });
};

type BcSalesOrdersResponse = {
  value: BcSalesOrder[];
};
