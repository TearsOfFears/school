import { IsUUID } from 'class-validator';
import { ICourse } from '../../interfaces/lib/course.interface';

export namespace PaymentCheck {
  export const topic = 'payment.check.query';

  export class Request {
    @IsUUID()
    courseId: string;

    @IsUUID()
    userId: string;
  }

  export class Response {
    status: 'canceled' | 'success' | 'progress';
  }
}
