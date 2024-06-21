import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchBc } from './fetchBc';
import { useFetchBc } from './useFetchBc';
import { useBusinessCentralContext } from './context/BusinessCentralContext';
import { BcCustomer } from './types/customer';

export const useBcCustomers = () => {
  return useFetchBc<CustomerFetchResponse>({
    queryKey: ['bc-customers'],
    fetchProps: {
      endPoint: `/customers`
    }
  });
};

export const usePaginatedBcCustomers = (operation?: string) => {
  const { token } = useBusinessCentralContext();

  const initialPage = 1;
  const pageSize = 10;

  return useInfiniteQuery({
    queryKey: ['bc', 'customers', operation || ''],
    queryFn: ({ pageParam = initialPage }) =>
      fetchBc<CustomerFetchResponse>({
        token,
        endPoint: `/customers?$top=${pageSize}&$skip=${(Number(pageParam) - 1) * pageSize}${operation || ''}`
      }),
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage || lastPage?.value?.length < pageSize) return;
      return (pages.length + 1).toString();
    },
    initialPageParam: initialPage.toString()
  });
};

interface CustomerFetchResponse {
  value: BcCustomer[];
}
