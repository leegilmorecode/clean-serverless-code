import * as createCustomerAccount from '@repositories/create-customer-account-repository/create-customer-account-repository';

import {
  CustomerAccountProps,
  PaymentStatus,
  SubscriptionType,
} from '@models/types';

import { CustomerAccount } from '@domain/customer-account';
import { createCustomerAccountUseCase } from '@use-cases/create-customer-account/create-customer-account';

let customerAccountDto: CustomerAccountProps;

describe('create-customer-use-case', () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2022-01-01'));
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    customerAccountDto = {
      id: '111',
      firstName: 'Gilmore',
      surname: 'Lee',
      subscriptionType: SubscriptionType.Basic,
      paymentStatus: PaymentStatus.Valid,
      created: 'created',
      updated: 'updated',
    };

    const createdAccount: CustomerAccount =
      CustomerAccount.createAccount(customerAccountDto);

    jest
      .spyOn(createCustomerAccount, 'createCustomerAccount')
      .mockResolvedValue(createdAccount);
  });

  it('should return the correct dto on success', async () => {
    // act
    const response = await createCustomerAccountUseCase(customerAccountDto);
    // arrange / assert
    expect(response).toMatchInlineSnapshot(`
Object {
  "created": "2022-01-01T00:00:00.000Z",
  "firstName": "Gilmore",
  "id": "f39e49ad-8f88-448f-8a15-41d560ad6d70",
  "paymentStatus": "Valid",
  "subscriptionType": "Basic",
  "surname": "Lee",
  "updated": "2022-01-01T00:00:00.000Z",
}
`);
  });
});
