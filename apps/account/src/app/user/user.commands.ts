import { Body, Controller } from '@nestjs/common';
import { UserService } from './user.service';
import {
  AccountBuyCourse,
  AccountChangeProfile,
  AccountCheckPayment,
  PurchaseState,
  UserEntity,
} from '@school/shared';
import { RMQRoute, RMQService, RMQValidate } from 'nestjs-rmq';
import { BuyCourseSaga } from './sagas/buy-course.saga';

@Controller()
export class UserCommands {
  constructor(
    private readonly userService: UserService,
    private readonly rmqService: RMQService
  ) {}

  @RMQValidate()
  @RMQRoute(AccountChangeProfile.topic)
  async get(
    @Body() { userId, ...dtoIn }: AccountChangeProfile.Request
  ): Promise<AccountChangeProfile.Response> {
    const user = await this.userService.updateUser(userId, dtoIn);
    return {
      user,
    };
  }
  @RMQValidate()
  @RMQRoute(AccountBuyCourse.topic)
  async buyCourse(
    @Body() { userId, courseId }: AccountBuyCourse.Request
  ): Promise<AccountBuyCourse.Response> {
    const existedUser = await this.userService.getUserById(userId);

    const userEntity = new UserEntity(existedUser);
    const saga = new BuyCourseSaga(userEntity, courseId, this.rmqService);
    const { paymentLink, user } = await saga.getState().pay();
    await this.userService.updateUserEmitter(user);
    return {
      paymentLink,
    };
  }
  @RMQValidate()
  @RMQRoute(AccountCheckPayment.topic)
  async checkPayment(
    @Body() { userId, courseId }: AccountCheckPayment.Request
  ): Promise<AccountCheckPayment.Response> {
    const existedUser = await this.userService.getUserById(userId);

    const userEntity = new UserEntity(existedUser);
    const saga = new BuyCourseSaga(userEntity, courseId, this.rmqService);
    const { user, status } = await saga.getState().checkPayment();
    await this.userService.updateUserEmitter(user);
    return { status };
  }
  // @RMQValidate()
  // @RMQRoute(AccountUserInfo.topic)
  // async get(@Param('userId') userId) {
  //   console.log('userId', userId);
  //   return this.userService.isUserExistById(userId);
  // }
}
