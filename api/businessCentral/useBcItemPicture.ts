import React from 'react';
import { fetchBc, getBcApiBaseUrl } from './fetchBc';
import { useFetchBc } from './useFetchBc';
import { useBusinessCentralContext } from './context/BusinessCentralContext';

export const useBcItemPicture = ({ itemId, debug }: { itemId: string; debug?: string }) => {
  // const { token } = useBusinessCentralContext();
  // const [rawPicture, setRawPicture] = React.useState<any>(null);

  return useFetchBc<PictureBcResponse>({
    queryKey: ['bc-item', 'picture'],
    fetchProps: {
      endPoint: `/items(${itemId})/picture/pictureContent`,
      options: {
        headers: {
          Accept: 'image/*'
        }
      }
    }
  });

  // React.useEffect(() => {
  //   const getRawPicture = async () => {
  //     const endPoint = `/items(${itemId})/picture(${data?.id})/content`;

  //     const picture = await fetch(data['pictureContent@odata.mediaReadLink'], {
  //       method: 'GET',
  //       headers: {
  //         Accept: 'image/jpeg',
  //         Authorization: `Bearer ${token}`
  //       }
  //     })
  //       .then((res) => res.blob())
  //       .catch((err: any) => {
  //         console.log('error fetching image', err);
  //       });
  //     if (debug === 'Shopify product 3') {
  //       const pictureBlob = URL.createObjectURL(picture);

  //       console.log('this is the picture', { debug, picture, endPoint, pictureBlob });
  //     }

  //     // setRawPicture(picture);
  //   };
  //   if (data?.id) {
  //     getRawPicture();
  //   }
  // }, [data?.id]);

  // console.log('this is raw picture', data, rawPicture);

  // return rawPicture;
};

type PictureBcResponse = {
  contentType: string;
  height: number;
  id: number;
  parentType: string;
  width: number;
};
