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
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { AccountLogin, AccountRegister } from '@school/shared';
import { LogoutUserDto } from './dto/user.dto';
import { IRefreshUser } from './interfaces/tokens.interface';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @RMQValidate()
  @RMQRoute(AccountRegister.topic)
  async register(
    @Body() dtoIn: AccountRegister.Request
  ): Promise<AccountRegister.Response> {
    const user = await this.authService.create(dtoIn);
    return user;
  }
  @RMQValidate()
  @RMQRoute(AccountLogin.topic)
  async login(
    @Body() dtoIn: AccountLogin.Request
  ): Promise<AccountLogin.Response> {
    await this.authService.validateUser(dtoIn.email, dtoIn.password);
    const user = await this.authService.login(dtoIn.email);
    return {
      userUpdated: user.userUpdated,
      accessToken: user.accessToken,
    };
  }
  @HttpCode(200)
  @Post('logout')
  async logout(
    @Body() dtoIn: LogoutUserDto,
    @Res({ passthrough: true }) response: Response
  ) {
    await this.authService.logout(dtoIn.userId);
    response.clearCookie('refreshToken');
  }
  @HttpCode(200)
  @Get('emailCheck/:email')
  async emailCheck(@Param('email') email: string) {
    return this.authService.getUserByEmail(email);
  }

  @HttpCode(200)
  @Get('refresh')
  async refreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    const { user, tokens }: IRefreshUser = await this.authService.refreshTokens(
      request.cookies.refreshToken
    );
    response.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    return { accessToken: tokens.accessToken, ...user };
  }

  // @UseGuards(JwtGuard)
  // @Get('find')
  // async find(@Body() dtoIn: FindDto) {
  //   return await this.userRepository.findAll(dtoIn);
  // }
  //
  // @UseGuards(JwtGuard)
  // @Get(':userId')
  // async getById(@Param('userId') userId: string) {
  //   // console.log(dtoIn.pageSize);
  //   const user = await this.userRepository.getByUserId(userId);
  //   if (!user) {
  //     throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
  //   }
  //   return user;
  // }
}
