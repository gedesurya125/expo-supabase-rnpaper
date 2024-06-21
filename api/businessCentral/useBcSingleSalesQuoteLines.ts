import { QUERY_KEYS } from './context/queryKeys';
import { BcSalesQuoteLine } from './types/salesQuoteLine';
import { useFetchBc } from './useFetchBc';

export const useBcSingleSalesQuoteLine = (salesQuoteId: string) => {
  return useFetchBc<BcSingleSalesQuoteLinesResponse>({
    queryKey: [QUERY_KEYS.bcSalesQuoteLine, salesQuoteId],
    fetchProps: {
      endPoint: `/salesQuotes(${salesQuoteId})/salesQuoteLines`
    }
  });
};

export type BcSingleSalesQuoteLinesResponse = {
  value: BcSalesQuoteLine[];
};
