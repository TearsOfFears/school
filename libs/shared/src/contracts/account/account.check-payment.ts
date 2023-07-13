import { IsUUID } from 'class-validator';
import { PurchaseState } from '../../interfaces/lib/course.interface';

export namespace AccountCheckPayment {
  export const topic = 'account.check-payment.command';

  export class Request {
    @IsUUID()
    userId: string;
    @IsUUID()
    courseId: string;
  }

  export class Response {
    status: PurchaseState;
  }
}
