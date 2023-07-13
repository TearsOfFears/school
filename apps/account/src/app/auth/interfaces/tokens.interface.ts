import { IUser } from '@school/shared';

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}
export interface IRefreshUser {
  user: IUser;
  tokens: ITokens;
}
