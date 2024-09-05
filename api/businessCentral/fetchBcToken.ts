import { useQuery } from '@tanstack/react-query';

type BcTokenResponse = {
  access_token: string;
};

export const fetchBcToken = async (
  callback?: (authResponse: BcTokenResponse) => void
): Promise<BcTokenResponse> => {
  const TENANT_ID = process.env.EXPO_PUBLIC_TENANT_ID;
  const BC_BASE_LOGIN_URL = process.env.EXPO_PUBLIC_BC_BASE_LOGIN_URL;

  const ACCESS_TOKEN_URL = `${BC_BASE_LOGIN_URL}/${TENANT_ID}/oauth2/v2.0/token`;

  const details = {
    grant_type: process.env.EXPO_PUBLIC_GRANT_TYPE || '',
    client_id: process.env.EXPO_PUBLIC_CLIENT_ID || '',
    client_secret: process.env.EXPO_PUBLIC_CLIENT_SECRET || '',
    scope: process.env.EXPO_PUBLIC_SCOPE || ''
  };

  let formBody: any = [];
  for (const property in details) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(details[property as keyof typeof details]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');

  const authResponse = await fetch(ACCESS_TOKEN_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formBody
  })
    .then((res) => res?.json())
    .catch((err) => {
      console.log('error fetch the token', err);
    });

  // call the callback if the callback exist
  !!callback && callback(authResponse);

  return authResponse;
};

export const useBcToken = () => {
  return useQuery({
    queryKey: ['bc-token'],
    queryFn: () => fetchBcToken()
  });
};
