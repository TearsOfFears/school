import { IsEmail, IsString } from 'class-validator';
import { IUser } from '../../interfaces/user.interface';

export namespace AccountLogin {
  export const topic = 'account.login.command';

  export class Request {
    @IsEmail()
    email: string;
    @IsString()
    password: string;
  }

  export class Response {
    userUpdated: IUser;
    accessToken: string;
  }
}
