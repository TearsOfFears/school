import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DatabaseModule } from '@school/shared';
import { UserController } from './user.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
