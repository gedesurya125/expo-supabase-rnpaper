export interface FetchBcProps {
  token?: string;
  endPoint?: string;
  options?: RequestInit;
}

export const getBcApiBaseUrl = (endPoint: string) => {
  const BASE_API_URL = process.env.EXPO_PUBLIC_BC_BASE_API_URL;
  const TENANT_ID = process.env.EXPO_PUBLIC_TENANT_ID;
  const ENVIRONMENT = process.env.EXPO_PUBLIC_BUSINESS_CENTRAL_ENVIRONMENT;
  const COMPANY_ID = process.env.EXPO_PUBLIC_BC_COMPANY_ID;

  const apiUrl = `${BASE_API_URL}/${TENANT_ID}/${ENVIRONMENT}/api/v2.0/companies(${COMPANY_ID})${endPoint || ''}`;
  return apiUrl;
};
export const fetchBc = async <T>(props: FetchBcProps): Promise<T | null> => {
  if (!props?.token) {
    console.log('token not exist');
    return null;
  }
  const apiUrl = getBcApiBaseUrl(props?.endPoint || '');

  const response = await fetch(apiUrl, {
    ...props.options,
    // ? below act as default value
    method: props?.options?.method || 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${props.token}`,
      ...props?.options?.headers
    }
  })
    .then((res) => {
      const contentType = res.headers.get('content-type');
      if (
        props.options?.headers &&
        // @ts-ignore
        props?.options?.headers?.Accept &&
        // @ts-ignore
        props?.options?.headers?.Accept !== 'application/json'
      ) {
        return res?.blob();
      }

      if (contentType?.includes('application/json')) return res.json();
      return res.text();
    })
    .catch((err) => {
      console.log('Error when fetching Business Central', err, props, apiUrl);
    });

  return response || null;
};
