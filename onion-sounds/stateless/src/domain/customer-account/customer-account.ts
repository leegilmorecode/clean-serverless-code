import {
  CreateCustomerAccountProps,
  NewCustomerAccountProps,
  PaymentStatus,
  SubscriptionType,
  UnmarshalledCustomerAccount,
} from '@models/types';

import { Entity } from '@entity/entity';
import { PaymentInvalidError } from '@errors/payment-invalid-error';
import { schema } from '@schemas/customer-account.schema';

// only works with entities and value objects - calling the repositories
// adapter --> use case --> (domain) <-- repository <-- adapter

/**
 * Customer Account Domain Entity
 *
 * A customer account is an entity which allows customers to create a new account, and upgrade their
 * account subscription.
 */
export class CustomerAccount extends Entity<CreateCustomerAccountProps> {
  private constructor({
    id,
    created,
    updated,
    ...props
  }: CreateCustomerAccountProps) {
    super(props, id, created, updated);
  }

  // create an instance of a new customer account through a factory method
  // adapter --> use case --> (domain)
  public static createAccount(props: NewCustomerAccountProps): CustomerAccount {
    const customerAccountProps: CreateCustomerAccountProps = {
      firstName: props.firstName,
      surname: props.surname,
      subscriptionType: SubscriptionType.Basic,
      paymentStatus: PaymentStatus.Valid,
    };

    const instance: CustomerAccount = new CustomerAccount(customerAccountProps);
    instance.validate(schema);

    return instance;
  }

  // upgrade a customer account from basic to advanced through a service (use case)
  // adapter --> use case --> (domain)
  public upgradeAccount(): void {
    // only allow an upgrade if the payment status is valid
    if (this.props.paymentStatus === PaymentStatus.Invalid) {
      throw new PaymentInvalidError('Payment is invalid - unable to upgrade');
    }

    // update the account to upgraded
    this.props.subscriptionType = SubscriptionType.Upgraded;

    this.setUpdatedDate();
    this.validate(schema);
  }

  // create a dto based on the domain instance
  public toDto(): UnmarshalledCustomerAccount {
    return {
      id: this.id,
      created: this.created,
      updated: this.updated,
      firstName: this.props.firstName,
      surname: this.props.surname,
      subscriptionType: this.props.subscriptionType,
      paymentStatus: this.props.paymentStatus,
    };
  }

  // create a domain object based on the dto
  public static toDomain(raw: UnmarshalledCustomerAccount): CustomerAccount {
    const instance = new CustomerAccount(raw);
    return instance;
  }
}
