export type BcCustomer = {
  '@odata.context'?: string;
  '@odata.etag'?: string;
  addressLine1: string;
  addressLine2: string;
  balanceDue?: number; //it is read only
  blocked?: string;
  city: string;
  country: string;
  creditLimit?: number;
  currencyCode: string;
  currencyId: string;
  displayName: string;
  email: string;
  id?: string;
  lastModifiedDateTime?: string;
  number: string;
  paymentMethodId: string;
  paymentTermsId: string;
  phoneNumber: string;
  postalCode: string;
  salespersonCode: string;
  shipmentMethodId: string;
  state: string;
  taxAreaDisplayName?: string; //it is read only
  taxAreaId: string;
  taxLiable?: boolean;
  taxRegistrationNumber: string;
  type: string;
  website: string;
  isSynced?: boolean;
};

export type NewCustomerRequest = {
  displayName: string;
  type: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phoneNumber: string;
  email: string;
  website: string;
  taxLiable: true;
  taxAreaId: string;
  taxRegistrationNumber: string;
  currencyId: string;
  currencyCode: string;
  paymentTermsId: string;
  shipmentMethodId: string;
  paymentMethodId: string;
  blocked: string;
};
