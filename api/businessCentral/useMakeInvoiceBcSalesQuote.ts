import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchBc } from './fetchBc';
import { useBusinessCentralContext } from './context/BusinessCentralContext';
import { BcSalesQuote } from './types/salesQuote';
import { QUERY_KEYS } from './context/queryKeys';
import { BcSalesQuoteResponse } from './useBcSalesQuotes';

export const useMakeInvoiceBcSalesQuote = () => {
  const { token } = useBusinessCentralContext();
  const queryClient = useQueryClient();

  const makeInvoiceBcSalesQuote = async (salesQuoteId: string) => {
    const data = await fetchBc<BcSalesQuote>({
      token,
      options: {
        method: 'POST'
      },
      endPoint: `/salesQuotes(${salesQuoteId})/Microsoft.NAV.makeInvoice`
    });
    return data;
  };

  return useMutation({
    mutationFn: async ({ salesQuoteId }: { salesQuoteId: string }) => {
      const response = await makeInvoiceBcSalesQuote(salesQuoteId);
      return response;
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData([QUERY_KEYS.bcSalesQuote], (oldData: BcSalesQuoteResponse) => {
        if (oldData) {
          return {
            value: oldData.value.filter((data) => data.id !== variables.salesQuoteId)
          };
        }
        return oldData;
      });
    }
  });
};
