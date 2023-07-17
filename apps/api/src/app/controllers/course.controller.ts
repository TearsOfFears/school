import {
  Body,
  Controller,
  Param,
  UseGuards,
  Patch,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import {
  AccountRegister,
  CourseCreate,
  CourseCreateDto,
  IUser,
  JwtGuard,
} from '@school/shared';
import { DeepPartial } from 'typeorm';
import { RMQService } from 'nestjs-rmq';

@Controller('course')
export class CourseController {
  constructor(private readonly rmqService: RMQService) {}

  @UseGuards(JwtGuard)
  @Post('create')
  async get(@Body() dtoIn: CourseCreateDto) {
    try {
      return await this.rmqService.send<
        CourseCreate.Request,
        CourseCreate.Response
      >(CourseCreate.topic, dtoIn);
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
