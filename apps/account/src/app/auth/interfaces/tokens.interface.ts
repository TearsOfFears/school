import { User } from '@school/shared';

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}
export interface IRefreshUser {
  user: User;
  tokens: ITokens;
}
