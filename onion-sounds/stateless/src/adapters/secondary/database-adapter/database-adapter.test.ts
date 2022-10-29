import {
  CustomerAccountProps,
  PaymentStatus,
  SubscriptionType,
} from '@models/types';
import {
  createAccount,
  retrieveAccount,
  updateAccount,
} from '@adapters/secondary/database-adapter/database-adapter';

import { awsSdkGetPromiseResponse } from '../../../../../__mocks__/aws-sdk';

let customerAccount: CustomerAccountProps;

describe('database-adapter', () => {
  beforeEach(() => {
    customerAccount = {
      id: '111',
      firstName: 'Gilmore',
      surname: 'Lee',
      subscriptionType: SubscriptionType.Basic,
      paymentStatus: PaymentStatus.Valid,
      created: 'created',
      updated: 'updated',
    };
  });

  describe('create-account', () => {
    it('should return the correct dto', async () => {
      await expect(createAccount(customerAccount)).resolves
        .toMatchInlineSnapshot(`
Object {
  "created": "created",
  "firstName": "Gilmore",
  "id": "111",
  "paymentStatus": "Valid",
  "subscriptionType": "Basic",
  "surname": "Lee",
  "updated": "updated",
}
`);
    });
  });

  describe('update-account', () => {
    it('should return the correct dto', async () => {
      await expect(updateAccount(customerAccount)).resolves
        .toMatchInlineSnapshot(`
Object {
  "created": "created",
  "firstName": "Gilmore",
  "id": "111",
  "paymentStatus": "Valid",
  "subscriptionType": "Basic",
  "surname": "Lee",
  "updated": "updated",
}
`);
    });
  });

  describe('retrieve-account', () => {
    it('should return the correct dto', async () => {
      // arrange
      awsSdkGetPromiseResponse.mockResolvedValueOnce({
        Item: {
          ...customerAccount,
        },
      });
      await expect(retrieveAccount(customerAccount.id)).resolves
        .toMatchInlineSnapshot(`
Object {
  "created": "created",
  "firstName": "Gilmore",
  "id": "111",
  "paymentStatus": "Valid",
  "subscriptionType": "Basic",
  "surname": "Lee",
  "updated": "updated",
}
`);
    });
  });
});
