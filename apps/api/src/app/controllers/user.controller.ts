import { Body, Controller, Get, Param, UseGuards, Patch } from '@nestjs/common';
import { IUserInterface, JwtGuard } from '@school/shared';
import { DeepPartial } from 'typeorm';

@Controller('user')
export class UserController {
  constructor() {}

  @UseGuards(JwtGuard)
  @Get(':userId')
  async get(@Param('userId') userId) {
    console.log('userId', userId);
    // return this.userService.isUserExistById(userId);
  }

  @UseGuards(JwtGuard)
  @Patch(':userId')
  async update(
    @Param('userId') userId,
    @Body() dtoIn: DeepPartial<IUserInterface>
  ) {
    console.log('userId', userId);
    // return this.userService.updateUser(userId, dtoIn);
  }
}
