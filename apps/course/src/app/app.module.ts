import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/database.config';
import { RMQModule } from 'nestjs-rmq';
import { getRmqConfig } from './configs/rmq.config';
import { CourseModule } from './course/course.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: 'envs/.course.env' }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    RMQModule.forRootAsync(getRmqConfig),
    CourseModule,
    PassportModule,
  ],
})
export class AppModule {}
