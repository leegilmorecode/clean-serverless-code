import { CustomerAccount } from '@domain/customer-account/customer-account';
import { publishCustomerAccountEvent } from '@adapters/secondary/event-adapter';

// this is the repository which the domain calls to utilise the adapter
// only working with domain entities, and translating dto's from the secondary adapters
// domain --> (repository) --> adapter
export async function publishEvent(
  customerAccount: CustomerAccount,
  eventName: string,
  eventSource: string
): Promise<void> {
  // use the adapter to raise the event
  await publishCustomerAccountEvent(
    customerAccount.toDto(),
    eventName,
    eventSource
  );
}
