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
import { JwtGuard } from '@school/shared';
import { LoginUserDto, LogoutUserDto, RegisterUserDto } from './dto/user.dto';
import { IRefreshUser } from './interfaces/tokens.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() dtoIn: RegisterUserDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const user = await this.authService.create(dtoIn);
    response.cookie('refreshToken', user.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    delete user.refreshToken;
    return user;
  }
  //: Promise<RegisterUserDto>
  @HttpCode(200)
  @Post('login')
  async login(
    @Body() dtoIn: LoginUserDto,
    @Res({ passthrough: true }) response: Response
  ) {
    await this.authService.validateUser(dtoIn.email, dtoIn.password);
    const user = await this.authService.login(dtoIn.email);
    response.cookie('refreshToken', user.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    return {
      ...user.userUpdated,
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
    console.log('request.cookies', request);
    const { user, tokens }: IRefreshUser = await this.authService.refreshTokens(
      request.cookies.refreshToken
    );
    response.cookie('refreshToken', user.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
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
