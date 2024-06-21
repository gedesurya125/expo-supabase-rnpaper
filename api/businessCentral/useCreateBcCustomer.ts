import { BcCustomer, NewCustomerRequest } from './types/customer';
import { useMutation } from '@tanstack/react-query';
import { fetchBc } from './fetchBc';
import { useBusinessCentralContext } from './context/BusinessCentralContext';
// import { createCustomer } from '../xentral/createCustomer';

export const useCreateBcCustomer = () => {
  const { token } = useBusinessCentralContext();

  const createCustomer = async (newCustomer: NewCustomerRequest) => {
    const data = await fetchBc<CustomerFetchResponse>({
      token,
      options: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCustomer)
      },
      endPoint: '/customers'
    });
    return data;
  };

  return useMutation({
    mutationFn: (newCustomer: NewCustomerRequest) => {
      console.log('this is the newly created customer', newCustomer);
      return createCustomer(newCustomer);
    }
  });
};

interface CustomerFetchResponse {
  value: BcCustomer[];
}
