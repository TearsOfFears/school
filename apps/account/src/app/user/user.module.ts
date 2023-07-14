import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCommands } from './user.commands';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { UserQueries } from './user.queries';
import { UserEntity, CourseEntity } from '@school/shared';
import { UserEventEmitter } from './user.event-immiter';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, CourseEntity])],
  controllers: [UserCommands, UserQueries],
  providers: [UserService, UserRepository, UserEventEmitter],
  exports: [UserService, UserRepository, UserEventEmitter],
})
export class UserModule {}
