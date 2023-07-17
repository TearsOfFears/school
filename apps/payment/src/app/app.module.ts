import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/database.config';
import { RMQModule } from 'nestjs-rmq';
import { getRmqConfig } from './configs/rmq.config';
import { PaymentModule } from './course/payment.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: 'envs/.payment.env' }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    RMQModule.forRootAsync(getRmqConfig),
    PaymentModule,
    PassportModule,
  ],
})
export class AppModule {}
