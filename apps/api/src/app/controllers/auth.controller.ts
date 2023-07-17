import {
  Body,
  Controller,
  Post,
  Get,
  Res,
  HttpCode,
  Param,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import {
  AccountLogin,
  AccountRegister,
  RegisterDto,
  LoginDto,
} from '@school/shared';
import { RMQService } from 'nestjs-rmq';

@Controller('auth')
export class AuthController {
  constructor(private readonly rmqService: RMQService) {}

  @Post('register')
  async register(
    @Body() dtoIn: RegisterDto,
    @Res({ passthrough: true }) response: Response
  ) {
    try {
      return await this.rmqService.send<
        AccountRegister.Request,
        AccountRegister.Response
      >(AccountRegister.topic, dtoIn);
    } catch (e) {
      if (e instanceof Error) {
        throw new UnauthorizedException(e.message);
      }
    }
  }

  @Post('login')
  async login(
    @Body() dtoIn: LoginDto,
    @Res({ passthrough: true }) response: Response
  ) {
    let user;
    try {
      user = await this.rmqService.send<
        AccountLogin.Request,
        AccountLogin.Response
      >(AccountLogin.topic, dtoIn);
    } catch (e) {
      if (e instanceof Error) {
        throw new UnauthorizedException(e.message);
      }
    }
    response.cookie('refreshToken', user.userUpdated.refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    return {
      ...user.userUpdated,
      accessToken: user.accessToken,
    };
  }

  // @HttpCode(200)
  // @Post('logout')
  // async logout(
  //   @Body() dtoIn
  //   @Res({ passthrough: true }) response: Response
  // ) {
  //   // await this.authService.logout(dtoIn.userId);
  //   // response.clearCookie('refreshToken');
  // }

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
