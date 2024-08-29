import React from 'react';
import { fetchBc, getBcApiBaseUrl } from './fetchBc';
import { useFetchBc } from './useFetchBc';
import { useBusinessCentralContext } from './context/BusinessCentralContext';

export const useBcItemPicture = ({ itemId, debug }: { itemId: string; debug?: string }) => {
  // const { token } = useBusinessCentralContext();
  // const [rawPicture, setRawPicture] = React.useState<any>(null);

  return useFetchBc<PictureBcResponse>({
    queryKey: ['bc-item-picture', itemId],
    fetchProps: {
      endPoint: `/items(${itemId})/picture/pictureContent`,
      options: {
        headers: {
          Accept: '*/*'
        }
      }
    }
  });
};

type PictureBcResponse = {
  contentType: string;
  height: number;
  id: number;
  parentType: string;
  width: number;
};
