import { IsString, IsUUID } from 'class-validator';
import { IUser } from '../../interfaces/lib/user.interface';

export namespace AccountChangeProfile {
  export const topic = 'account.change-profile.command';

  export class Request {
    @IsUUID()
    userId: string;
    @IsString()
    firstName?: string;
    @IsString()
    lastName?: string;
  }
  export class Response {
    user: Omit<IUser, 'passwordHash'>;
  }
}
