import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  Repository,
  UpdateResult,
} from 'typeorm';

import { UserEntity } from '@school/shared';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}
  public async save(data: DeepPartial<UserEntity>): Promise<UserEntity> {
    return await this.userRepository.save(data);
  }
  public async create(data: DeepPartial<UserEntity>): Promise<UserEntity> {
    return this.userRepository.save(data);
  }

  public async findOneById(
    userId: string,
    filterCondition: FindOneOptions<UserEntity>
  ): Promise<UserEntity | null> {
    return await this.userRepository.findOne({
      where: { userId },
      ...filterCondition,
    });
  }
  public async findAndUpdate(
    userId: string,
    data: DeepPartial<UserEntity>
  ): Promise<UpdateResult | null> {
    return await this.userRepository.update({ userId }, data);
  }
  public async findByCondition(
    filterCondition: FindOneOptions<UserEntity>
  ): Promise<UserEntity | null> {
    return await this.userRepository.findOne(filterCondition);
  }

  public async findWithRelations(
    relations: FindManyOptions<UserEntity>
  ): Promise<UserEntity[]> {
    return await this.userRepository.find(relations);
  }

  public async findAll(
    options?: FindManyOptions<UserEntity>
  ): Promise<UserEntity[]> {
    return await this.userRepository.find(options);
  }

  public async remove(data: UserEntity): Promise<UserEntity> {
    return await this.userRepository.remove(data);
  }
}
