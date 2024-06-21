import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchBc } from './fetchBc';
import { useFetchBc } from './useFetchBc';
import { useBusinessCentralContext } from './context/BusinessCentralContext';
import { BcCustomer } from './types/customer';

interface SingleCustomerHooksProps {
  customerId: string;
}

export const useSingleBcCustomers = ({ customerId }: SingleCustomerHooksProps) => {
  return useFetchBc<BcCustomer>({
    queryKey: ['bc-customer', customerId],
    fetchProps: {
      endPoint: `/customers(${customerId})`
    }
  });
};
