import { BuyCourseSagaState } from './buy-course.state';
import { User } from '../entity/user.entity';
import {
  CourseGetCourses,
  PaymentCheck,
  PaymentGenerateLink,
  PurchaseState,
} from '@school/shared';

export class BuyCourseSagaStateStarted extends BuyCourseSagaState {
  public async pay(): Promise<{ paymentLink: string; user: User }> {
    const { course } = await this.saga.rmqService.send<
      CourseGetCourses.Request,
      CourseGetCourses.Response
    >(CourseGetCourses.topic, { courseId: this.saga.courseId });
    if (!course) {
      throw new Error('This course not exist');
    }
    if (course.price === 0) {
      this.saga.setState(this.saga.courseId, PurchaseState.Purchased);
      return { paymentLink: null, user: this.saga.user };
    }

    const { paymentLink } = await this.saga.rmqService.send<
      PaymentGenerateLink.Request,
      PaymentGenerateLink.Response
    >(PaymentGenerateLink.topic, {
      courseId: course.courseId,
      userId: this.saga.user.userId,
      suma: course.price,
    });
    this.saga.setState(course.courseId, PurchaseState.WaitingForPayment);
    return { paymentLink, user: this.saga.user };
  }

  public async cancel(): Promise<{ user: User }> {
    this.saga.setState(this.saga.courseId, PurchaseState.Canceled);
    return { user: this.saga.user };
  }

  public async checkPayment(): Promise<{ user: User }> {
    throw new Error('Cannot check payment that not started');
  }
}

export class BuyCourseSagaStateWaitingForPayment extends BuyCourseSagaState {
  cancel(): Promise<{ user: User }> {
    throw new Error('Payment in process');
  }

  public async checkPayment(): Promise<{ user: User }> {
    const { status } = await this.saga.rmqService.send<
      PaymentCheck.Request,
      PaymentCheck.Response
    >(PaymentCheck.topic, {
      courseId: this.saga.courseId,
      userId: this.saga.user.userId,
    });
    if (status === 'canceled') {
      this.saga.setState(this.saga.courseId, PurchaseState.Canceled);
      return {
        user: this.saga.user,
      };
    }
    if (status !== 'success') {
      return {
        user: this.saga.user,
      };
    }
    this.saga.setState(this.saga.courseId, PurchaseState.Purchased);
    return {
      user: this.saga.user,
    };
  }

  public pay(): Promise<{ paymentLink: string; user: User }> {
    throw new Error('Cannot cancel payment in process');
  }
}

export class BuyCourseSagaStatePurchased extends BuyCourseSagaState {
  cancel(): Promise<{ user: User }> {
    throw new Error('Cannot cancel payment for bought course');
  }

  public async checkPayment(): Promise<{ user: User }> {
    throw new Error('Cannot check payment for bought course');
  }

  public pay(): Promise<{ paymentLink: string; user: User }> {
    throw new Error('Cannot pay for bought course');
  }
}

export class BuyCourseSagaStateCanceled extends BuyCourseSagaState {
  cancel(): Promise<{ user: User }> {
    throw new Error('Cannot pay for cancel course');
  }

  public async checkPayment(): Promise<{ user: User }> {
    throw new Error('Cannot check payment for cancel course');
  }

  public pay(): Promise<{ paymentLink: string; user: User }> {
    this.saga.setState(this.saga.courseId, PurchaseState.Started);
    return this.saga.getState().pay();
  }
}
