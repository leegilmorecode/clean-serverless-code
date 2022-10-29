export enum SubscriptionType {
  Basic = 'Basic',
  Upgraded = 'Upgraded',
}

export enum PaymentStatus {
  Valid = 'Valid',
  Invalid = 'Invalid',
}

export type UnmarshalledCustomerAccount = {
  id: string;
  created: string;
  updated: string;
  firstName: string;
  surname: string;
  subscriptionType: SubscriptionType;
  paymentStatus: PaymentStatus;
};

export type CreateCustomerAccountProps = {
  id?: string;
  created?: string;
  updated?: string;
  firstName: string;
  surname: string;
  subscriptionType: SubscriptionType;
  paymentStatus: PaymentStatus;
};

export type CustomerAccountProps = {
  id: string;
  created: string;
  updated: string;
  firstName: string;
  surname: string;
  subscriptionType: SubscriptionType;
  paymentStatus: PaymentStatus;
};

export type NewCustomerAccountProps = {
  firstName: string;
  surname: string;
};
