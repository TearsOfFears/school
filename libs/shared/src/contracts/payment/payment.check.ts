import { IsUUID } from 'class-validator';
import { ICourse, PurchaseState } from '../../interfaces/course.interface';

export enum PaymentStatus {
  Canceled = 'canceled',
  Success = 'success',
  Progress = 'progress',
}
export namespace PaymentCheck {
  export const topic = 'payment.check.query';

  export class Request {
    @IsUUID()
    courseId: string;

    @IsUUID()
    userId: string;
  }

  export class Response {
    status: PaymentStatus;
  }
}
