import { IsUUID } from 'class-validator';
import { IUser } from '../../interfaces/user.interface';

export namespace AccountBuyCourse {
  export const topic = 'account.buy-course.command';

  export class Request {
    @IsUUID()
    userId: string;
    @IsUUID()
    courseId: string;
  }

  export class Response {
    paymentLink: string;
  }
}
