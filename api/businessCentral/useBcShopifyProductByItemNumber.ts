import { BcShopifyProducts } from './types/bcShopifyProducts';
import { useFetchBcOData } from './useFetchBcOData';

export const useBcShopifyProductByItemNumber = ({ itemNumber }: { itemNumber: string }) => {
  const result = useFetchBcOData<ResponseType>({
    queryKey: ['bc-OData-item', itemNumber],
    fetchProps: {
      endPoint: `/ShopifyProducts?$filter=ItemNo eq '${itemNumber}'`
    }
  });

  return {
    data: result?.data?.value[0] || null,
    isLoading: result?.isLoading,
    error: result?.error
  };
};

type ResponseType = {
  value: BcShopifyProducts[];
};
