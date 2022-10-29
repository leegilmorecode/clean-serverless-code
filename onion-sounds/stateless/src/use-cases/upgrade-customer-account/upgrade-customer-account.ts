import { eventName, eventSource } from '@events/customer-account-upgraded';

import { CustomerAccountProps } from '@models/types';
import { publishEvent } from '@repositories/publish-event-recipient';
import { retrieveCustomerAccount } from '@repositories/retrieve-customer-account-repository';
import { updateCustomerAccount } from '@repositories/update-customer-account-repository';

// takes a dto and calls the domain entities (returning a dto to the primary adapter)
// adapter --> (use case) --> repositories

/**
 * Upgrade an existing Customer Account
 * Input: Customer account ID
 * Output: CustomerAccountProps
 *
 * Primary course:
 *
 *  1. Retrieve the customer account based on ID
 *  2. Upgrade and validate the customer account
 *  3. Publish a CustomerAccountUpdated event.
 */
export async function upgradeCustomerAccountUseCase(
  id: string
): Promise<CustomerAccountProps> {
  const customerAccount = await retrieveCustomerAccount(id);

  customerAccount.upgradeAccount();

  await updateCustomerAccount(customerAccount);

  // we would typically validate the events: https://leejamesgilmore.medium.com/amazon-eventbridge-schema-validation-5b6c2c5ce3b3
  await publishEvent(customerAccount, eventName, eventSource);

  return customerAccount.toDto();
}
