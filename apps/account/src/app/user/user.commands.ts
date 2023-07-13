import { Body, Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { AccountChangeProfile } from '@school/shared';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { AccountBuyCourse } from '@school/shared';
import { AccountCheckPayment } from '@school/shared';
@Controller()
export class UserCommands {
  constructor(private readonly userService: UserService) {}

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
    // const user = await this.userService.updateUser(userId, dtoIn);
    // return {
    //   user,
    // };
  }
  @RMQValidate()
  @RMQRoute(AccountCheckPayment.topic)
  async checkPayment(
    @Body() { userId, courseId }: AccountCheckPayment.Request
  ): Promise<AccountCheckPayment.Response> {
    // const user = await this.userService.updateUser(userId, dtoIn);
    // return {
    //   user,
    // };
  }
  // @RMQValidate()
  // @RMQRoute(AccountUserInfo.topic)
  // async get(@Param('userId') userId) {
  //   console.log('userId', userId);
  //   return this.userService.isUserExistById(userId);
  // }
}
