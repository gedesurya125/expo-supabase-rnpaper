import { useFetchBc } from './useFetchBc';
import { SalesInvoiceLine } from './types/salesInvoiceLine';

export const useBcSingleSalesInvoiceLines = (salesInvoiceId: string) => {
  return useFetchBc<SalesInvoiceLinesResponse>({
    queryKey: ['bc-single-sales-invoice-lines', salesInvoiceId],
    fetchProps: {
      endPoint: `/salesInvoices(${salesInvoiceId})/salesInvoiceLines`
    }
  });
};

interface SalesInvoiceLinesResponse {
  value: SalesInvoiceLine[];
}
