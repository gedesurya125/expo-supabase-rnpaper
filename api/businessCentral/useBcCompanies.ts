import { useFetchBc } from './useFetchBc';
import { BcCompany } from './types/companies';

export const useBcCompanies = () => {
  return useFetchBc<BcCompanyFetchResponse>({
    queryKey: ['bc-companies'],
    fetchProps: {
      endPoint: '/companies'
    }
  });
};

type BcCompanyFetchResponse = {
  value: BcCompany[];
};
