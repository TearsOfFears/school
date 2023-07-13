import { User } from '../entity/user.entity';
import { RMQService } from 'nestjs-rmq';
import { PurchaseState } from '@school/shared';
import { BuyCourseSaga } from './buy-course.saga';

export abstract class BuyCourseSagaState {
  public saga: BuyCourseSaga;

  public setContext(saga: BuyCourseSaga) {
    this.saga = saga;
  }
  public abstract pay(): Promise<{ paymentLink: string; user: User }>;
  public abstract checkPayment(): Promise<{ user: User }>;
  public abstract cancel(): Promise<{ user: User }>;
}
