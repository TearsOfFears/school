import { User } from '../entity/user.entity';
import { RMQService } from 'nestjs-rmq';
import { PurchaseState } from '@school/shared';
import { BuyCourseSagaState } from './buy-course.state';
import {
  BuyCourseSagaStateCanceled,
  BuyCourseSagaStatePurchased,
  BuyCourseSagaStateStarted,
  BuyCourseSagaStateWaitingForPayment,
} from './buy-course.steps';

export class BuyCourseSaga {
  private state: BuyCourseSagaState;
  constructor(
    public user: User,
    public courseId: string,
    public rmqService: RMQService
  ) {}

  getState() {
    return this.state;
  }
  setState(courseId: string, state: PurchaseState) {
    switch (state) {
      case PurchaseState.Started:
        this.state = new BuyCourseSagaStateStarted();
        break;
      case PurchaseState.WaitingForPayment:
        this.state = new BuyCourseSagaStateWaitingForPayment();
        break;
      case PurchaseState.Purchased:
        this.state = new BuyCourseSagaStatePurchased();
        break;
      case PurchaseState.Canceled:
        this.state = new BuyCourseSagaStateCanceled();
        break;
    }

    this.state.setContext(this);

    this.user.setCourseStatus(courseId, state);
  }
}
