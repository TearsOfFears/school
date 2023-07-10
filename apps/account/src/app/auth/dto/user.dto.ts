import {
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsEmail,
  IsUUID,
} from 'class-validator';

export class RegisterUserDto {
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
export class PageInfo {
  @IsNumber()
  pageSize: number;
  @IsNumber()
  pageIndex: number;

  @IsNumber()
  @IsOptional()
  pageTotal?: number;
}

export class FindDto {
  @IsObject({ each: true })
  pageInfo: PageInfo;

  @IsString()
  @IsString({ each: true })
  sortBy: string;

  @IsString()
  order: string;

  @IsString()
  @IsOptional()
  universityId: string;
}
export class LoginUserDto {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}

export class LogoutUserDto {
  @IsUUID()
  userId: string;
}
export class EmailCheckDto {
  @IsString()
  email: string;
}

// export type UserCredentians = CreateUserDto & 'refreshToken';
