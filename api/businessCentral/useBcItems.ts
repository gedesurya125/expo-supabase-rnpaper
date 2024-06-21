import { useFetchBc } from './useFetchBc';
import { BcItem } from './types/item';

export const useBcItems = () => {
  return useFetchBc<BcItemHookResponse>({
    queryKey: ['bc-items'],
    fetchProps: {
      endPoint: `/items`
    }
  });
};

type BcItemHookResponse = {
  value: BcItem[];
};
