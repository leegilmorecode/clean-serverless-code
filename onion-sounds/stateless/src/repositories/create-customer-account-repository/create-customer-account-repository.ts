import { CustomerAccount } from '@domain/customer-account';
import { CustomerAccountProps } from '@models/types';
import { createAccount } from '@adapters/secondary/database-adapter';

// this is the repository which the domain calls to utilise the adapter
// only working with domain entities, and translating dto's from the secondary adapters
// domain --> (repository) --> adapter (always returns a domain object)
export async function createCustomerAccount(
  account: CustomerAccount
): Promise<CustomerAccount> {
  // use the adapter to call the database
  const customerAccount: CustomerAccountProps = await createAccount(
    account.toDto()
  );
  return CustomerAccount.toDomain(customerAccount);
}
