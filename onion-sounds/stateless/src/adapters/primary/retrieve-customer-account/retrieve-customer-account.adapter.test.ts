import * as retrieveCustomerAccountUseCase from '@use-cases/retrieve-customer-account/retrieve-customer-account';

import {
  CustomerAccountProps,
  PaymentStatus,
  SubscriptionType,
} from '@models/types';

import { APIGatewayProxyEvent } from 'aws-lambda';
import { retrieveCustomerAccountAdapter } from '@adapters/primary/retrieve-customer-account/retrieve-customer-account.adapter';

let event: Partial<APIGatewayProxyEvent>;
let customerAccount: CustomerAccountProps;

describe('retrieve-customer-account-handler', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

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

    jest
      .spyOn(retrieveCustomerAccountUseCase, 'retrieveCustomerAccountUseCase')
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
retrieveCustomerAccountAdapter((event as any))).
resolves.toMatchInlineSnapshot(`
Object {
  "body": "{\\"id\\":\\"111\\",\\"firstName\\":\\"Gilmore\\",\\"surname\\":\\"Lee\\",\\"subscriptionType\\":\\"Basic\\",\\"paymentStatus\\":\\"Valid\\",\\"created\\":\\"created\\",\\"updated\\":\\"updated\\"}",
  "statusCode": 200,
}
`);
  });

  it('should return the correct response on error', async () => {
    // arrange
    event = {} as any;

    // act & assert
    await expect(
retrieveCustomerAccountAdapter((event as any))).
resolves.toMatchInlineSnapshot(`
Object {
  "body": "\\"no id in the path parameters of the event\\"",
  "statusCode": 400,
}
`);
  });
});
