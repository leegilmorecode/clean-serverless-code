import * as retrieveCustomerAccount from '@repositories/retrieve-customer-account-repository/retrieve-customer-account-repository';
import * as updateCustomerAccount from '@repositories/update-customer-account-repository/update-customer-account-repository';

import {
  CustomerAccountProps,
  PaymentStatus,
  SubscriptionType,
} from '@models/types';

import { CustomerAccount } from '@domain/customer-account';
import { upgradeCustomerAccountUseCase } from '@use-cases/upgrade-customer-account/upgrade-customer-account';

let customerAccountDto: CustomerAccountProps;

describe('upgrade-customer-use-case', () => {
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
    jest
      .spyOn(updateCustomerAccount, 'updateCustomerAccount')
      .mockResolvedValue(createdAccount);
  });

  it('should update the subscription type on success', async () => {
    // arrange
    const customerId = '111';
    const response = await upgradeCustomerAccountUseCase(customerId);

    // act / assert
    expect(response).toMatchInlineSnapshot(`
Object {
  "created": "2022-01-01T00:00:00.000Z",
  "firstName": "Gilmore",
  "id": "f39e49ad-8f88-448f-8a15-41d560ad6d70",
  "paymentStatus": "Valid",
  "subscriptionType": "Upgraded",
  "surname": "Lee",
  "updated": "2022-01-01T00:00:00.000Z",
}
`);
  });
});
