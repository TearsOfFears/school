import { IUser } from './user.interface';
import { Column } from 'typeorm';

export enum PurchaseState {
  Started = 'Started',
  WaitingForPayment = 'WaitingForPayment',
  Purchased = 'Purchased',
  Canceled = 'Canceled',
}
export enum State {
  Active = 'Active',
  Deactivated = 'Deactivated',
  InDevelop = 'InDevelop',
}

export interface ICourseUser {
  courseId: string;

  courseUserId?: string;

  price?: number;

  purchaseState?: PurchaseState;

  user?: IUser;

  createdAt?: Date;

  updatedAt?: Date;
}

export interface ICourse {
  courseId: string;

  title: string;

  description: string;

  banner: string;

  hours: string;

  state: State;

  price: number;

  createdAt?: Date;

  updatedAt?: Date;
}
