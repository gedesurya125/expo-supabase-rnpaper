import React from 'react';
import { useBcToken } from '../fetchBcToken';
import { BcCompany } from '../types/companies';

type BusinessCentralContextValue = {
  token?: string;
  companies?: BcCompany[];
};

const BusinessCentralContext = React.createContext<BusinessCentralContextValue>({ token: '' });

export const useBusinessCentralContext = () => React.useContext(BusinessCentralContext);

export const BusinessCentralContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { data } = useBcToken();

  return (
    <BusinessCentralContext.Provider
      value={{
        token: data?.access_token
      }}>
      {children}
    </BusinessCentralContext.Provider>
  );
};
// ? this context store the token that will be used for the api to do a fetch request
