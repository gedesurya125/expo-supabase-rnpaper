export type BcSalesQuote = {
  acceptedDate: string;
  billToAddressLine1: string;
  billToAddressLine2: string;
  billToCity: string;
  billToCountry: string;
  billToCustomerId: string;
  billToCustomerNumber: string;
  billToName: string;
  billToPostCode: string;
  billToState: string;
  currencyCode: string;
  currencyId: string;
  customerId: string;
  customerName: string;
  customerNumber: string;
  discountAmount: number;
  documentDate: string;
  dueDate: string;
  email: string;
  externalDocumentNumber: string;
  id: string;
  lastModifiedDateTime: string;
  number: string;
  paymentTermsId: string;
  phoneNumber: string;
  postingDate: string;
  salesperson: string;
  sellToAddressLine1: string;
  sellToAddressLine2: string;
  sellToCity: string;
  sellToCountry: string;
  sellToPostCode: string;
  sellToState: string;
  sentDate: string;
  shipToAddressLine1: string;
  shipToAddressLine2: string;
  shipToCity: string;
  shipToContact: string;
  shipToCountry: string;
  shipToName: string;
  shipToPostCode: string;
  shipToState: string;
  shipmentMethodId: string;
  shortcutDimension1Code: string;
  shortcutDimension2Code: string;
  status: string;
  totalAmountExcludingTax: number;
  totalAmountIncludingTax: number;
  totalTaxAmount: number;
  validUntilDate: string;
};

export type CreateBcSalesQuoteRequest = {
  documentDate: string;
  customerNumber: string;
  currencyCode: string;
  paymentTermsId: string;
  salesperson: string;
};
