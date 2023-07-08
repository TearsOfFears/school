import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from '@school/shared';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from './auth/configs/jwt.config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../../../../libs/shared/src/strategy/jwt.strategy';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: 'envs/.account.env' }),
    ConfigModule,
    PassportModule,
    UserModule,
    AuthModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
