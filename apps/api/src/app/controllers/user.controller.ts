import {
  Body,
  Controller,
  Get,
  Param,
  UseGuards,
  Patch,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import {
  AccountBuyCourse,
  BuyCourseDto,
  CourseCreate,
  IUser,
  JwtGuard,
} from '@school/shared';
import { DeepPartial } from 'typeorm';
import { RMQService } from 'nestjs-rmq';

@Controller('user')
export class UserController {
  constructor(private readonly rmqService: RMQService) {}

  @UseGuards(JwtGuard)
  @Post('buyCourse')
  async get(@Body() dtoIn: BuyCourseDto) {
    try {
      return await this.rmqService.send<
        AccountBuyCourse.Request,
        AccountBuyCourse.Response
      >(AccountBuyCourse.topic, dtoIn);
    } catch (e) {
      if (e instanceof Error) {
        throw new UnauthorizedException(e.message);
      }
    }
  }

  @UseGuards(JwtGuard)
  @Patch(':userId')
  async update(@Param('userId') userId, @Body() dtoIn: DeepPartial<IUser>) {
    console.log('userId', userId);
    // return this.userService.updateUser(userId, dtoIn);
  }
}
