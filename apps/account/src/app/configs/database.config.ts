import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

import { User } from '../user/entity/user.entity';
import { Course } from '../user/entity/course.entity';
const postgresConfig = (
  configService: ConfigService
): PostgresConnectionOptions => {
  return {
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE_NAME'),
    entities: [User, Course],
    logger: 'advanced-console',
    synchronize: true,
    logging: true,
  };
};

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService
  ): Promise<TypeOrmModuleOptions> => {
    return postgresConfig(configService);
  },
};
