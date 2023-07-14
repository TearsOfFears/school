import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@school/shared';
import { RMQModule } from 'nestjs-rmq';
import { getRmqConfig } from './configs/rmq.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: 'envs/.account.env' }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    RMQModule.forRootAsync(getRmqConfig),
    ConfigModule,
    PassportModule,
    UserModule,
    AuthModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
