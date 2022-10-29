import { CustomerAccountProps } from '@models/types';
import { retrieveCustomerAccount } from '@repositories/retrieve-customer-account-repository';

// takes a dto and calls the domain entities (returning a dto to the primary adapter)
// adapter --> (use case) --> repositories

/**
 * Retrueve a Customer Account
 * Input: Customer account ID
 * Output: CustomerAccountProps
 *
 * Primary course:
 *
 *  1.Retrieve the customer account based on ID
 */
export async function retrieveCustomerAccountUseCase(
  id: string
): Promise<CustomerAccountProps> {
  const instance = await retrieveCustomerAccount(id);

  return instance.toDto();
}
