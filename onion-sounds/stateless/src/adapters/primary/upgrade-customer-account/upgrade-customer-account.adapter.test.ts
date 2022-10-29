import * as upgradeCustomerAccountUseCase from '@use-cases/upgrade-customer-account/upgrade-customer-account';

import {
  CustomerAccountProps,
  PaymentStatus,
  SubscriptionType,
} from '@models/types';

import { APIGatewayProxyEvent } from 'aws-lambda';
import { upgradeCustomerAccountAdapter } from '@adapters/primary/upgrade-customer-account/upgrade-customer-account.adapter';

let event: Partial<APIGatewayProxyEvent>;
let customerAccount: CustomerAccountProps;

describe('upgrade-customer-account-handler', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    customerAccount = {
      id: '111',
      firstName: 'Gilmore',
      surname: 'Lee',
      subscriptionType: SubscriptionType.Upgraded,
      paymentStatus: PaymentStatus.Valid,
      created: 'created',
      updated: 'updated',
    };

    jest
      .spyOn(upgradeCustomerAccountUseCase, 'upgradeCustomerAccountUseCase')
      .mockResolvedValue(customerAccount);

    event = {
      pathParameters: {
        id: '111',
      },
    };
  });

  it('should return the correct response on success', async () => {
    // act & assert
    await expect(
upgradeCustomerAccountAdapter((event as any))).
resolves.toMatchInlineSnapshot(`
Object {
  "body": "{\\"id\\":\\"111\\",\\"firstName\\":\\"Gilmore\\",\\"surname\\":\\"Lee\\",\\"subscriptionType\\":\\"Upgraded\\",\\"paymentStatus\\":\\"Valid\\",\\"created\\":\\"created\\",\\"updated\\":\\"updated\\"}",
  "statusCode": 200,
}
`);
  });

  it('should return the correct response on error', async () => {
    // arrange
    event = {} as any;

    // act & assert
    await expect(
upgradeCustomerAccountAdapter((event as any))).
resolves.toMatchInlineSnapshot(`
Object {
  "body": "\\"no id in the path parameters of the event\\"",
  "statusCode": 400,
}
`);
  });
});
