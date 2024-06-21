export const getBcODataBaseUrl = (endPoint: string) => {
  const BASE_API_URL = process.env.EXPO_PUBLIC_BC_BASE_API_URL;
  const TENANT_ID = process.env.EXPO_PUBLIC_TENANT_ID;
  const ENVIRONMENT = process.env.EXPO_PUBLIC_BUSINESS_CENTRAL_ENVIRONMENT;
  const COMPANY_NAME = process.env.EXPO_PUBLIC_BC_COMPANY_NAME;
  const apiUrl = `${BASE_API_URL}/${TENANT_ID}/${ENVIRONMENT}/ODataV4/Company('${COMPANY_NAME}')${endPoint}`;
  return apiUrl;
};

export const fetchBcOData = async <T>(props: FetchBcODataProps): Promise<T | null> => {
  if (!props?.token) {
    console.log('token not exist');
    return null;
  }
  const apiUrl = getBcODataBaseUrl(props?.endPoint || '');

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
    .then((res) => res?.json())
    .catch((err) => {
      console.log('Error when fetching Business Central OData', err, props, apiUrl);
      return null;
    });

  return response || null;
};

export interface FetchBcODataProps {
  token?: string;
  endPoint?: string;
  options?: RequestInit;
}
