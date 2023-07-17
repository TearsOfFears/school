import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCommands } from './user.commands';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { UserQueries } from './user.queries';
import { UserEntity, CourseUserEntity } from '@school/shared';
import { UserEventEmitter } from './user.event-emitter';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, CourseUserEntity])],
  controllers: [UserCommands, UserQueries],
  providers: [UserService, UserRepository, UserEventEmitter],
  exports: [UserService, UserRepository, UserEventEmitter],
})
export class UserModule {}
