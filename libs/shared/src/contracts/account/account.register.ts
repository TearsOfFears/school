import { IsEmail, IsOptional, IsString } from 'class-validator';
import { User } from '../../database/entities/user.entity';

export namespace AccountRegister {
  export const topic = 'account.register.command';

  export class Request {
    @IsString()
    firstName?: string;
    @IsString()
    lastName?: string;
    @IsEmail()
    email: string;
    @IsString()
    password?: string;
    @IsString()
    @IsOptional()
    passwordHash?: string;
  }

  export class Response extends User {
    accessToken: string;
  }
}
