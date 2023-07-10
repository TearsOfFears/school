import { IsEmail, IsString } from 'class-validator';
import { User } from '../../database/entities/user.entity';

export namespace AccountLogin {
  export const topic = 'account.login.command';

  export class Request {
    @IsEmail()
    email: string;
    @IsString()
    password: string;
  }

  export class Response extends User {
    accessToken: string;
  }
}
