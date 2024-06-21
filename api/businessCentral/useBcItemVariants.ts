import { BcItemVariant } from './types/bcItemVariant';
import { useFetchBc } from './useFetchBc';

interface UseBcItemVariantsProps {
  itemId: string;
}

export const useBcItemsVariants = ({ itemId }: UseBcItemVariantsProps) => {
  return useFetchBc<BcItemVariantsHookResponse>({
    queryKey: ['bc-item-variants', itemId],
    fetchProps: {
      endPoint: `/items(${itemId})/itemVariants`
    }
  });
};

type BcItemVariantsHookResponse = {
  value: BcItemVariant[];
};
