import { useFetchBc } from './useFetchBc';
import { BcPaymentTerm } from './types/paymentTerm';

export const useBcSinglePaymentTerms = (paymentTermId: string) => {
  return useFetchBc<BcPaymentTerm>({
    queryKey: ['bc-single-payment-term', paymentTermId],
    fetchProps: {
      endPoint: `/paymentTerms(${paymentTermId})`
    }
  });
};
