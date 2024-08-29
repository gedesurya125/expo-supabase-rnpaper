import { useFetchBc, usePaginatedFetchBc } from './useFetchBc';
import { BcItem } from './types/item';

export const useBcItems = () => {
  return useFetchBc<BcItemHookResponse>({
    queryKey: ['bc-items'],
    fetchProps: {
      endPoint: `/items?$top=5`
    }
  });
};

type BcItemHookResponse = {
  value: BcItem[];
};

export const usePaginatedBcItems = () => {
  return usePaginatedFetchBc<BcItemHookResponse>({
    endPoint: '/items',
    queryKey: ['paginated-bc-items'],
    pageSize: 7
  });
};
