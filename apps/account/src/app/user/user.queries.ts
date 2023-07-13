import { Controller, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { AccountUserCourses, AccountUserInfo } from '@school/shared';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
@Controller()
export class UserQueries {
  constructor(private readonly userService: UserService) {}
  @RMQValidate()
  @RMQRoute(AccountUserInfo.topic)
  async userInfo(
    @Body() { userId }: AccountUserInfo.Request
  ): Promise<AccountUserInfo.Response> {
    const user = await this.userService.isUserExistById(userId);
    return {
      user,
    };
  }

  @RMQValidate()
  @RMQRoute(AccountUserCourses.topic)
  async get(
    @Body() { userId }: AccountUserCourses.Request
  ): Promise<AccountUserCourses.Response> {
    console.log('userId', userId);
    const user = await this.userService.isUserExistById(userId);
    return {
      courses: user.courses,
    };
  }
}
