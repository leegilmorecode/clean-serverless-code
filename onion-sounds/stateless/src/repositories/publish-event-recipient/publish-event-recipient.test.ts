import * as publishCustomerAccountEvent from '@adapters/secondary/event-adapter/event-adapter';

import {
  CustomerAccountProps,
  PaymentStatus,
  SubscriptionType,
} from '@models/types';

import { CustomerAccount } from '@domain/customer-account';
import { publishEvent } from '@repositories/publish-event-recipient/publish-event-recipient';

describe('publish-event-repository', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should return void on success', async () => {
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
      .spyOn(publishCustomerAccountEvent, 'publishCustomerAccountEvent')
      .mockReturnThis();

    await expect(
      publishEvent(
        customer,
        'CustomerAccountCreated',
        'com.customer-account-onion'
      )
    ).resolves.toBeUndefined();
  });
});
