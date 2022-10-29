import * as updateAccount from '@adapters/secondary/database-adapter/database-adapter';

import {
  CustomerAccountProps,
  PaymentStatus,
  SubscriptionType,
} from '@models/types';

import { CustomerAccount } from '@domain/customer-account';
import { updateCustomerAccount } from '@repositories/update-customer-account-repository/update-customer-account-repository';

describe('update-customer-account-repository', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should return the correct customer domain object', async () => {
    // arrange
    const customerAccountProps: CustomerAccountProps = {
      id: '111',
      firstName: 'Gilmore',
      surname: 'Lee',
      subscriptionType: SubscriptionType.Basic,
      paymentStatus: PaymentStatus.Valid,
      created: 'created',
      updated: 'updated',
    };

    const customer: CustomerAccount =
      CustomerAccount.createAccount(customerAccountProps);

    jest
      .spyOn(updateAccount, 'updateAccount')
      .mockResolvedValue(customerAccountProps);

    await expect(updateCustomerAccount(customer)).resolves
      .toMatchInlineSnapshot(`
CustomerAccount {
  "_created": "created",
  "_id": "111",
  "_updated": "updated",
  "props": Object {
    "created": "created",
    "firstName": "Gilmore",
    "id": "111",
    "paymentStatus": "Valid",
    "subscriptionType": "Basic",
    "surname": "Lee",
    "updated": "updated",
  },
}
`);
  });
});
