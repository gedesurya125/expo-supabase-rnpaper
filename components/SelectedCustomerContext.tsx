import React, { useContext, createContext, ReactNode, useState } from 'react';
import { BcCustomer } from '@/api/businessCentral/types/customer';

interface ContextValue {
  customerInfo?: BcCustomer | null;
  handleSetCustomerInfo: (customerInfo: any) => void;
  handleClearCustomerInfo: () => void;
}

const initialContextValue: ContextValue = {
  customerInfo: null,
  handleSetCustomerInfo: () => {},
  handleClearCustomerInfo: () => {}
};

const SelectedCustomerContext = createContext(initialContextValue);

interface SelectedCustomerContextProviderProps {
  children: ReactNode;
}

export const SelectedCustomerContextProvider = ({
  children
}: SelectedCustomerContextProviderProps) => {
  const [customerInfo, setCustomerInfo] = useState<BcCustomer | null>(null);

  // TODO: notify to change current customer
  const handleSetCustomerInfo = (customerInfo: any) => {
    setCustomerInfo(customerInfo);
  };

  const handleClearCustomerInfo = () => {
    setCustomerInfo(null);
  };

  return (
    <SelectedCustomerContext.Provider
      value={{ customerInfo, handleSetCustomerInfo, handleClearCustomerInfo }}>
      {children}
    </SelectedCustomerContext.Provider>
  );
};

export const useSelectedCustomerContext = () => useContext(SelectedCustomerContext);
