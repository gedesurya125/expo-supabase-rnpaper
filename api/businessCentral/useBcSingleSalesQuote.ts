import { BcSalesQuote } from './types/salesQuote';
import { useFetchBc } from './useFetchBc';

export const useBcSingleSalesQuote = (salesQuoteId: string) => {
  return useFetchBc<BcSalesQuote>({
    queryKey: ['bc-sales-quote-detail', salesQuoteId],
    fetchProps: {
      endPoint: `/salesQuotes(${salesQuoteId})`
    }
  });
};
