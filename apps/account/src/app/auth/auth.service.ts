import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { IUserInterface } from '@school/shared';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { IRefreshUser, ITokens } from './interfaces/tokens.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}
  async create(dtoIn) {
    const userOld = await this.userService.getUserByEmail(dtoIn.email, {
      select: ['passwordHash'],
    });
    if (userOld) {
      throw new HttpException(
        'User with this email already exist',
        HttpStatus.BAD_REQUEST
      );
    }
    dtoIn.passwordHash = this.hashData(dtoIn.password);
    delete dtoIn.password;
    const user = await this.userService.createUser(dtoIn);
    const tokens = await this.getTokens(user.userId, user.email);
    await this.updateRefreshToken(user.userId, tokens.refreshToken);
    return {
      ...user,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }
  async refreshTokens(refreshToken: string): Promise<IRefreshUser> {
    if (!refreshToken) {
      throw new HttpException(
        'Refresh token does not present',
        HttpStatus.UNAUTHORIZED
      );
    }
    let userDataValidate;
    try {
      userDataValidate = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_SECRET_REFRESH'),
      });
    } catch (e) {
      throw new HttpException('Token expire', HttpStatus.UNAUTHORIZED);
    }
    const user = await this.userService.isUserExistByEmail(
      userDataValidate.email
    );

    const tokens = await this.getTokens(user.userId, user.email);
    await this.updateRefreshToken(user.userId, tokens.refreshToken);
    return { user, tokens };
  }
  async getUserByEmail(email: string): Promise<IUserInterface> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new HttpException(
        'User with this email not exist',
        HttpStatus.BAD_REQUEST
      );
    }
    return user;
  }
  async validateUser(
    email: string,
    password: string
  ): Promise<Pick<IUserInterface, 'email'>> {
    const user = await this.userService.isUserExistByEmail(email, {
      select: ['passwordHash'],
    });
    const isEqualPassword = compareSync(password, user.passwordHash);
    if (!isEqualPassword) {
      throw new HttpException(
        'Something wrong with credential tha you pass',
        HttpStatus.UNAUTHORIZED
      );
    }
    return {
      email: user.email,
    };
  }
  async login(email: string) {
    const user = await this.userService.getUserByEmail(email);
    const tokens = await this.getTokens(user.userId, user.email);
    const userUpdated = await this.updateRefreshToken(
      user.userId,
      tokens.refreshToken
    );
    return {
      userUpdated,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }
  async logout(userId: string) {
    await this.userService.updateUser(userId, {
      refreshToken: null,
    });
  }
  async updateRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<IUserInterface> {
    const hashedRefreshToken = this.hashData(refreshToken);
    return await this.userService.updateUser(userId, {
      refreshToken: hashedRefreshToken,
    });
  }
  async getTokens(userId: string, email: string): Promise<ITokens> {
    console.log(userId, email);
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync({
        userId,
        email,
      }),
      this.jwtService.sign(
        {
          userId,
          email,
        },
        {
          expiresIn: this.configService.get('JWT_SECRET_REFRESH_EXPIRES_IN'),
          secret: this.configService.get('JWT_SECRET_REFRESH'),
        }
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
  hashData(dtoIn: any) {
    const salt = genSaltSync(10);
    return hashSync(dtoIn, salt);
  }
}
