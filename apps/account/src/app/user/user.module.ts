import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCommands } from './user.commands';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserRepository } from './repositories/user.repository';
import { UserQueries } from './user.queries';
import { Course } from './entity/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Course])],
  controllers: [UserCommands, UserQueries],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
