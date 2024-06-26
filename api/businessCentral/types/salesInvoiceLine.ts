export type SalesInvoiceLine = {
  id: string;
  documentId: string;
  sequence: number;
  itemId: string;
  accountId: string;
  lineType: string;
  lineObjectNumber: string;
  description: string;
  description2: string;
  unitOfMeasureId: string;
  unitOfMeasureCode: string;
  quantity: number;
  unitPrice: number;
  discountAmount: number;
  discountPercent: number;
  discountAppliedBeforeTax: false;
  amountExcludingTax: number;
  taxCode: string;
  taxPercent: number;
  totalTaxAmount: number;
  amountIncludingTax: number;
  invoiceDiscountAllocation: number;
  netAmount: number;
  netTaxAmount: number;
  netAmountIncludingTax: number;
  shipmentDate: string;
  itemVariantId: string;
  locationId: string;
};
