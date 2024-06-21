import { useFetchBc } from './useFetchBc';
import { BcItem } from './types/item';

export const useBcSingleItem = ({ itemId }: { itemId: string }) => {
  return useFetchBc<BcItem>({
    queryKey: ['bc-item', itemId],
    fetchProps: {
      endPoint: `/items(${itemId})?$select=Picture`
    }
  });
};

type BcItemHookResponse = {
  value: BcItem;
};
