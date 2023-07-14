import { BuyCourseSagaState } from './buy-course.state';
import { UserEntity } from '@school/shared';
import {
  CourseGetCourses,
  PaymentCheck,
  PaymentGenerateLink,
  PaymentStatus,
  PurchaseState,
} from '@school/shared';

export class BuyCourseSagaStateStarted extends BuyCourseSagaState {
  public async pay(): Promise<{ paymentLink: string; user: UserEntity }> {
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

  public async cancel(): Promise<{ user: UserEntity }> {
    this.saga.setState(this.saga.courseId, PurchaseState.Canceled);
    return { user: this.saga.user };
  }

  public async checkPayment(): Promise<{
    user: UserEntity;
    status: PaymentStatus;
  }> {
    throw new Error('Cannot check payment that not started');
  }
}

export class BuyCourseSagaStateWaitingForPayment extends BuyCourseSagaState {
  cancel(): Promise<{ user: UserEntity }> {
    throw new Error('Payment in process');
  }

  public async checkPayment(): Promise<{
    user: UserEntity;
    status: PaymentStatus;
  }> {
    const { status } = await this.saga.rmqService.send<
      PaymentCheck.Request,
      PaymentCheck.Response
    >(PaymentCheck.topic, {
      courseId: this.saga.courseId,
      userId: this.saga.user.userId,
    });
    if (status === PaymentStatus.Canceled) {
      this.saga.setState(this.saga.courseId, PurchaseState.Canceled);
      return {
        user: this.saga.user,
        status: PaymentStatus.Canceled,
      };
    }
    if (status !== PaymentStatus.Success) {
      return {
        user: this.saga.user,
        status: PaymentStatus.Success,
      };
    }
    this.saga.setState(this.saga.courseId, PurchaseState.Purchased);
    return {
      user: this.saga.user,
      status: PaymentStatus.Progress,
    };
  }

  public pay(): Promise<{ paymentLink: string; user: UserEntity }> {
    throw new Error('Cannot cancel payment in process');
  }
}

export class BuyCourseSagaStatePurchased extends BuyCourseSagaState {
  cancel(): Promise<{ user: UserEntity }> {
    throw new Error('Cannot cancel payment for bought course');
  }

  public async checkPayment(): Promise<{
    user: UserEntity;
    status: PaymentStatus;
  }> {
    throw new Error('Cannot check payment for bought course');
  }

  public pay(): Promise<{ paymentLink: string; user: UserEntity }> {
    throw new Error('Cannot pay for bought course');
  }
}

export class BuyCourseSagaStateCanceled extends BuyCourseSagaState {
  cancel(): Promise<{ user: UserEntity }> {
    throw new Error('Cannot pay for cancel course');
  }

  public async checkPayment(): Promise<{
    user: UserEntity;
    status: PaymentStatus;
  }> {
    throw new Error('Cannot check payment for cancel course');
  }

  public pay(): Promise<{ paymentLink: string; user: UserEntity }> {
    this.saga.setState(this.saga.courseId, PurchaseState.Started);
    return this.saga.getState().pay();
  }
}
