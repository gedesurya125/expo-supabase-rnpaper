import { useFetchBc } from './useFetchBc';
import { SalesInvoice } from './types/salesInvoice';

export const useBcSalesInvoices = (params?: string) => {
  console.log('thisis the params', params);

  return useFetchBc<BcSalesInvoiceResponse>({
    queryKey: ['bc-sales-invoices', params || ''],
    fetchProps: {
      endPoint: `/salesInvoices?${params || ''}`
    }
  });
};

type BcSalesInvoiceResponse = {
  value: SalesInvoice[];
};
