import * as retrieveAccount from '@adapters/secondary/database-adapter/database-adapter';

import {
  CustomerAccountProps,
  PaymentStatus,
  SubscriptionType,
} from '@models/types';

import { retrieveCustomerAccount } from '@repositories/retrieve-customer-account-repository/retrieve-customer-account-repository';

describe('retrieve-customer-account-repository', () => {
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

    const customerId = '111';

    jest
      .spyOn(retrieveAccount, 'retrieveAccount')
      .mockResolvedValue(customerAccountProps);

    await expect(
retrieveCustomerAccount(customerId)).
resolves.toMatchInlineSnapshot(`
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
