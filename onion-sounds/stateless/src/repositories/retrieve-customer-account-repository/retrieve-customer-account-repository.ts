import { CustomerAccount } from '@domain/customer-account/customer-account';
import { CustomerAccountProps } from '@models/types';
import { retrieveAccount } from '@adapters/secondary/database-adapter';

// this is the repository which the domain calls to utilise the adapter
// only working with domain entities, and translating dto's from the secondary adapters
// domain --> (repository) --> adapter (always returns a domain object)
export async function retrieveCustomerAccount(
  id: string
): Promise<CustomerAccount> {
  // use the adapter to call the database
  const customerAccount: CustomerAccountProps = await retrieveAccount(id);
  return CustomerAccount.toDomain(customerAccount);
}
