import { IsUUID } from 'class-validator';
import { IUser } from '../../interfaces/lib/user.interface';

export namespace AccountUserInfo {
  export const topic = 'account.user-info.query';

  export class Request {
    @IsUUID()
    userId: string;
  }

  export class Response {
    user: Omit<IUser, 'passwordHash'>;
  }
}
