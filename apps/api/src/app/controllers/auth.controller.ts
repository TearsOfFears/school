import {
  Body,
  Controller,
  Post,
  Get,
  Res,
  HttpCode,
  Param,
  Req,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AccountLogin, AccountRegister, JwtGuard } from '@school/shared';
import { LogoutUserDto, RegisterUserDto } from './dto/user.dto';
import { IRefreshUser } from './interfaces/tokens.interface';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Post('register')
  async register(
    @Body() dtoIn: AccountRegister.Request,
    @Res({ passthrough: true }) response: Response
  ) {}

  @Post('login')
  async login(
    @Body() dtoIn: AccountLogin.Request,
    @Res({ passthrough: true }) response: Response
  ) {}
  @HttpCode(200)
  @Post('logout')
  async logout(
    @Body() dtoIn: LogoutUserDto,
    @Res({ passthrough: true }) response: Response
  ) {
    // await this.authService.logout(dtoIn.userId);
    // response.clearCookie('refreshToken');
  }
  @HttpCode(200)
  @Get('emailCheck/:email')
  async emailCheck(@Param('email') email: string) {
    // return this.authService.getUserByEmail(email);
  }

  @HttpCode(200)
  @Get('refresh')
  async refreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    // const { user, tokens }: IRefreshUser = await this.authService.refreshTokens(
    //   request.cookies.refreshToken
    // );
    // response.cookie('refreshToken', tokens.refreshToken, {
    //   httpOnly: true,
    //   sameSite: 'none',
    //   secure: true,
    // });
    // return { accessToken: tokens.accessToken, ...user };
  }
}
