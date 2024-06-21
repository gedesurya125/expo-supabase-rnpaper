import { QUERY_KEYS } from './context/queryKeys';
import { BcSalesQuote } from './types/salesQuote';
import { useFetchBc } from './useFetchBc';

export const useBcSalesQuotes = () => {
  return useFetchBc<BcSalesQuoteResponse>({
    queryKey: [QUERY_KEYS.bcSalesQuote],
    fetchProps: {
      endPoint: `/salesQuotes`
    }
  });
};

export type BcSalesQuoteResponse = {
  value: BcSalesQuote[];
};
