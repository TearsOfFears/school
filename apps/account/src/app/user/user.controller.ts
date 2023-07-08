import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { DeepPartial } from 'typeorm';
import { User } from '@school/shared';
import { JwtGuard } from '@school/shared';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(JwtGuard)
  @Get(':userId')
  async get(@Param('userId') userId) {
    console.log('userId', userId);
    return this.userService.isUserExistById(userId);
  }

  @UseGuards(JwtGuard)
  @Patch(':userId')
  async update(@Param('userId') userId, @Body() dtoIn: DeepPartial<User>) {
    console.log('userId', userId);
    return this.userService.updateUser(userId, dtoIn);
  }
}
