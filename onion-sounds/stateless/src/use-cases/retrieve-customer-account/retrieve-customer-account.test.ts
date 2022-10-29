import * as retrieveCustomerAccount from '@repositories/retrieve-customer-account-repository/retrieve-customer-account-repository';

import {
  CustomerAccountProps,
  PaymentStatus,
  SubscriptionType,
} from '@models/types';

import { CustomerAccount } from '@domain/customer-account';
import { retrieveCustomerAccountUseCase } from '@use-cases/retrieve-customer-account/retrieve-customer-account';

let customerAccountDto: CustomerAccountProps;

describe('retrieve-customer-use-case', () => {
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
      .spyOn(retrieveCustomerAccount, 'retrieveCustomerAccount')
      .mockResolvedValue(createdAccount);
  });

  it('should return the correct dto on success', async () => {
    // arrange
    const customerId = '111';
    const response = await retrieveCustomerAccountUseCase(customerId);

    // act / assert
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
