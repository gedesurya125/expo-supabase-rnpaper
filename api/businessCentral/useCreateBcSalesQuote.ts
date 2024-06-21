import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchBc } from './fetchBc';
import { useBusinessCentralContext } from './context/BusinessCentralContext';
import { BcSalesQuote, CreateBcSalesQuoteRequest } from './types/salesQuote';
import { QUERY_KEYS } from './context/queryKeys';
import { BcSalesQuoteResponse } from './useBcSalesQuotes';
import { useCreateBcSalesQuoteLine } from './useCreateBcSalesQuoteLine';
import { CreateBcSalesQuoteLineRequest } from './types/salesQuoteLine';

export const useCreateBcSalesQuote = () => {
  const { token } = useBusinessCentralContext();
  const queryClient = useQueryClient();
  const createBcSalesQuoteLines = useCreateBcSalesQuoteLine();

  const createBcSalesQuote = async (newSalesQuote: CreateBcSalesQuoteRequest) => {
    const data = await fetchBc<BcSalesQuote>({
      token,
      options: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSalesQuote)
      },
      endPoint: '/salesQuotes'
    });
    return data;
  };

  return useMutation({
    mutationFn: async ({
      newSalesQuote,
      newSalesQuoteLines
    }: {
      newSalesQuote: CreateBcSalesQuoteRequest;
      newSalesQuoteLines: CreateBcSalesQuoteLineRequest[];
    }) => {
      const newSalesQuoteResponse = await createBcSalesQuote(newSalesQuote);

      //? add the sales quote lines

      // ! Cannot be done in parallel
      // if (newSalesQuoteResponse?.id) {
      //   await Promise.all(
      //     newSalesQuoteLines?.map(async (newSalesQuoteLine) => {
      //       await createBcSalesQuoteLines.mutateAsync({
      //         salesQuoteId: newSalesQuoteResponse.id,
      //         newSalesQuoteLine
      //       });
      //     })
      //   );
      // }

      if (newSalesQuoteResponse?.id) {
        for (let i = 0; i < newSalesQuoteLines?.length; i++) {
          await createBcSalesQuoteLines.mutateAsync({
            salesQuoteId: newSalesQuoteResponse.id,
            newSalesQuoteLine: newSalesQuoteLines[i]
          });
        }
      }

      // TODO: this should return the latest sales quote after adding the lines. currently it return the old sales quote
      return newSalesQuoteResponse;
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData([QUERY_KEYS.bcSalesQuote], (oldData: BcSalesQuoteResponse) => {
        if (oldData) {
          return {
            value: [...oldData.value, data]
          };
        }
        return oldData;
      });
    }
  });
};
