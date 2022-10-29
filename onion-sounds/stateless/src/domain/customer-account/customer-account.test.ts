import {
  CustomerAccountProps,
  NewCustomerAccountProps,
  PaymentStatus,
  SubscriptionType,
  UnmarshalledCustomerAccount,
} from '@models/types';

import { CustomerAccount } from '@domain/customer-account';

let customer: UnmarshalledCustomerAccount = {
  created: '2022-01-01T00:00:00.000Z',
  firstName: 'Lee',
  id: 'f39e49ad-8f88-448f-8a15-41d560ad6d70',
  paymentStatus: PaymentStatus.Valid,
  subscriptionType: SubscriptionType.Basic,
  surname: 'Gilmore',
  updated: '2022-01-01T00:00:00.000Z',
};

describe('customer-account', () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2022-01-01'));
  });

  afterAll(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  describe('create account', () => {
    it('should fail creating a new account with an invalid customer', () => {
      // arrange
      const newCustomerAccount: NewCustomerAccountProps = {
        firstName: '±', // invalid
        surname: 'Gilmore',
      };

      // act / assert
      expect(() =>
        CustomerAccount.createAccount(newCustomerAccount)
      ).toThrowErrorMatchingInlineSnapshot(
        `"[{\\"instancePath\\":\\"/firstName\\",\\"schemaPath\\":\\"#/properties/firstName/pattern\\",\\"keyword\\":\\"pattern\\",\\"params\\":{\\"pattern\\":\\"^[a-zA-Z]+$\\"},\\"message\\":\\"must match pattern \\\\\\"^[a-zA-Z]+$\\\\\\"\\"}]"`
      );
    });

    it('should create the new account successfully with a valid customer', () => {
      // arrange
      const newCustomerAccount: NewCustomerAccountProps = {
        firstName: 'Lee',
        surname: 'Gilmore',
      };

      // act
      const newCustomer = CustomerAccount.createAccount(newCustomerAccount);

      // assert
      expect(newCustomer).toMatchSnapshot();
    });
  });

  describe('upgrade account', () => {
    it('should upgrade an existing customer by id if payment status is valid', () => {
      // arrange
      const customerAccount: CustomerAccount = CustomerAccount.toDomain({
        ...customer,
        subscriptionType: SubscriptionType.Upgraded,
      });

      // act
      customerAccount.upgradeAccount();

      // assert
      expect(customerAccount).toMatchSnapshot();
    });

    it('should not upgrade an existing customer by id if payment status is invalid', () => {
      // arrange
      const customerAccount: CustomerAccount = CustomerAccount.toDomain({
        ...customer,
        paymentStatus: PaymentStatus.Invalid,
      });

      // act / assert
      expect(() => customerAccount.upgradeAccount()).toThrow(
        'Payment is invalid - unable to upgrade'
      );
    });
  });

  describe('toDto', () => {
    it('should create the correct dto', () => {
      // arrange
      const newCustomerAccount: NewCustomerAccountProps = {
        firstName: 'Lee',
        surname: 'Gilmore',
      };

      // act
      const newCustomer = CustomerAccount.createAccount(newCustomerAccount);

      // assert
      expect(newCustomer.toDto()).toMatchSnapshot();
    });
  });

  describe('toDomain', () => {
    it('should create a domain object based on a dto', () => {
      // arrange
      const customerAccountProps: CustomerAccountProps = {
        id: 'f39e49ad-8f88-448f-8a15-41d560ad6d70',
        firstName: 'Lee',
        surname: 'Gilmore',
        paymentStatus: PaymentStatus.Valid,
        subscriptionType: SubscriptionType.Upgraded,
        created: '2022-01-01T00:00:00.000Z',
        updated: '2022-01-01T00:00:00.000Z',
      };

      // act
      const customerAccount: CustomerAccount =
        CustomerAccount.toDomain(customerAccountProps);

      // assert
      expect(customerAccount).toMatchSnapshot();
    });
  });
});
