import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeepPartial, FindOneOptions } from 'typeorm';
import { UserRepository } from './repositories/user.repository';
import { UserEntity } from '@school/shared';
import { UserEventEmitter } from './user.event-immiter';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userEventEmitter: UserEventEmitter
  ) {}

  async createUser(dtoIn) {
    try {
      return await this.userRepository.create(dtoIn);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async getUserById(userId: string, options?: FindOneOptions<UserEntity>) {
    try {
      return await this.userRepository.findOneById(userId, options);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async getUserByEmail(email: string, options?: FindOneOptions<UserEntity>) {
    try {
      return await this.userRepository.findByCondition({
        where: { email },
        ...options,
      });
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async isUserExistById(userId: string, options?: FindOneOptions<UserEntity>) {
    const user = await this.getUserById(userId, options);
    if (!user) {
      throw new HttpException(
        'User with this id not found',
        HttpStatus.NOT_FOUND
      );
    }
    return user;
  }
  async isUserExistByEmail(
    email: string,
    options?: FindOneOptions<UserEntity>
  ) {
    const user = await this.getUserByEmail(email, options);
    if (!user) {
      throw new HttpException(
        'User with this email not found',
        HttpStatus.NOT_FOUND
      );
    }
    return user;
  }

  async updateUser(userId: string, dtoIn: DeepPartial<UserEntity>) {
    await this.isUserExistById(userId);

    try {
      await this.userRepository.findAndUpdate(userId, dtoIn);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
    return this.getUserById(userId);
  }

  public updateUserEmitter(user: UserEntity) {
    return Promise.all([
      this.userEventEmitter.handle(user),
      this.updateUser(user.userId, user),
    ]);
  }
}
