import {
  CreateCustomerAccountProps,
  CustomerAccountProps,
} from '@models/types';
import { eventName, eventSource } from '@events/customer-account-created';

import { CustomerAccount } from '@domain/customer-account';
import { createCustomerAccount } from '@repositories/create-customer-account-repository';
import { publishEvent } from '@repositories/publish-event-recipient';

// takes a dto and calls the domain entities (returning a dto to the primary adapter)
// adapter --> (use case) --> domain & repositories

/**
 * Create a new Customer Account
 * Input: CreateCustomerAccountProps
 * Output: CustomerAccountProps
 *
 * Primary course:
 *
 *  1. Validate the customer account details
 *  2. Create a new customer account
 *  3. Publish a CustomerAccountCreated event.
 */
export async function createCustomerAccountUseCase(
  account: CreateCustomerAccountProps
): Promise<CustomerAccountProps> {
  const newCustomer = CustomerAccount.createAccount(account);

  const createdAccount = await createCustomerAccount(newCustomer);

  // we would typically validate the events: https://leejamesgilmore.medium.com/amazon-eventbridge-schema-validation-5b6c2c5ce3b3
  await publishEvent(createdAccount, eventName, eventSource);

  return createdAccount.toDto();
}
