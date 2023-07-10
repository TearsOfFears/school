import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeepPartial, FindOneOptions } from 'typeorm';
import { UserRepository } from './repositories/user.repository';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(dtoIn) {
    try {
      return await this.userRepository.create(dtoIn);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async getUserById(userId: string, options?: FindOneOptions<User>) {
    try {
      return await this.userRepository.findOneById(userId, options);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async getUserByEmail(email: string, options?: FindOneOptions<User>) {
    try {
      return await this.userRepository.findByCondition({
        where: { email },
        ...options,
      });
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async isUserExistById(userId: string, options?: FindOneOptions<User>) {
    const user = await this.getUserById(userId, options);
    if (!user) {
      throw new HttpException(
        'User with this id not found',
        HttpStatus.NOT_FOUND
      );
    }
    return user;
  }
  async isUserExistByEmail(email: string, options?: FindOneOptions<User>) {
    const user = await this.getUserByEmail(email, options);
    if (!user) {
      throw new HttpException(
        'User with this email not found',
        HttpStatus.NOT_FOUND
      );
    }
    return user;
  }

  async updateUser(userId: string, dtoIn: DeepPartial<User>) {
    await this.isUserExistById(userId);

    try {
      await this.userRepository.findAndUpdate(userId, dtoIn);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
    return this.getUserById(userId);
  }
}
