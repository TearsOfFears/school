import { IUser } from './user.interface';

export enum PurchaseState {
  Started = 'Started',
  WaitingForPayment = 'WaitingForPayment',
  Purchased = 'Purchased',
  Canceled = 'Canceled',
}

export interface ICourse {
  courseId: string;

  price?: number;

  purchaseState?: PurchaseState;

  user?: IUser;

  createdAt?: Date;

  updatedAt?: Date;
}
