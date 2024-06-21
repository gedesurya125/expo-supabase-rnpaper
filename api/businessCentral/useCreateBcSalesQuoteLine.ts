import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchBc } from './fetchBc';
import { useBusinessCentralContext } from './context/BusinessCentralContext';
import { QUERY_KEYS } from './context/queryKeys';
import { BcSalesQuoteLine, CreateBcSalesQuoteLineRequest } from './types/salesQuoteLine';
import { BcSingleSalesQuoteLinesResponse } from './useBcSingleSalesQuoteLines';

export const useCreateBcSalesQuoteLine = () => {
  const { token } = useBusinessCentralContext();
  const queryClient = useQueryClient();

  const createBcSalesQuote = async (
    salesQuoteId: string,
    newSalesQuoteLine: CreateBcSalesQuoteLineRequest
  ) => {
    const data = await fetchBc<BcSalesQuoteLine>({
      token,
      options: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSalesQuoteLine)
      },
      endPoint: `/salesQuotes(${salesQuoteId})/salesQuoteLines`
    });
    return data;
  };

  return useMutation({
    mutationFn: ({
      salesQuoteId,
      newSalesQuoteLine
    }: {
      salesQuoteId: string;
      newSalesQuoteLine: CreateBcSalesQuoteLineRequest;
    }) => {
      return createBcSalesQuote(salesQuoteId, newSalesQuoteLine);
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(
        [QUERY_KEYS.bcSalesQuoteLine, variables.salesQuoteId],
        (oldData: BcSingleSalesQuoteLinesResponse) => {
          if (oldData) {
            return {
              value: [...oldData.value, data] //?.creating item mean adding item
            };
          }
          return oldData;
        }
      );
    }
  });
};
