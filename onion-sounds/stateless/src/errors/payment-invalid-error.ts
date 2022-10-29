export class PaymentInvalidError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PaymentInvalidError';
  }
}
