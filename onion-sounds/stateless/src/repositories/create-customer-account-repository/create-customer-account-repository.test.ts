import * as createAccount from '@adapters/secondary/database-adapter/database-adapter';

import {
  CustomerAccountProps,
  PaymentStatus,
  SubscriptionType,
} from '@models/types';

import { CustomerAccount } from '@domain/customer-account';
import { createCustomerAccount } from '@repositories/create-customer-account-repository/create-customer-account-repository';

describe('create-customer-account-repository', () => {
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
      .spyOn(createAccount, 'createAccount')
      .mockResolvedValue({ ...customerAccountProps, updated: 'updatedNew' });

    await expect(createCustomerAccount(customer)).resolves
      .toMatchInlineSnapshot(`
CustomerAccount {
  "_created": "created",
  "_id": "111",
  "_updated": "updatedNew",
  "props": Object {
    "created": "created",
    "firstName": "Gilmore",
    "id": "111",
    "paymentStatus": "Valid",
    "subscriptionType": "Basic",
    "surname": "Lee",
    "updated": "updatedNew",
  },
}
`);
  });
});
