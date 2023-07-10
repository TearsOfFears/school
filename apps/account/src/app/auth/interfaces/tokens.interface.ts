import { IUserInterface } from '@school/shared';

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}
export interface IRefreshUser {
  user: IUserInterface;
  tokens: ITokens;
}
