import { IsUUID } from 'class-validator';
import { PaymentStatus } from '../payment/payment.check';

export namespace AccountCheckPayment {
  export const topic = 'account.check-payment.command';

  export class Request {
    @IsUUID()
    userId: string;
    @IsUUID()
    courseId: string;
  }

  export class Response {
    status: PaymentStatus;
  }
}
