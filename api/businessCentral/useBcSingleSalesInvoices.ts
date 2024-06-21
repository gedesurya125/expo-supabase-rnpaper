import { useFetchBc } from './useFetchBc';
import { SalesInvoice } from './types/salesInvoice';

export const useBcSingleSalesInvoice = (salesInvoiceId: string) => {
  return useFetchBc<SalesInvoice>({
    queryKey: ['bc-single-sales-invoices', salesInvoiceId],
    fetchProps: {
      endPoint: `/salesInvoices(${salesInvoiceId})`
    }
  });
};
