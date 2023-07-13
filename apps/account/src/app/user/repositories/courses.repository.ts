import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  Repository,
  UpdateResult,
} from 'typeorm';

import { User } from '../entity/user.entity';
import { Course } from '../entity/course.entity';

@Injectable()
export class CoursesRepository {
  constructor(
    @InjectRepository(Course)
    private readonly userRepository: Repository<User>
  ) {}
  public async save(data: DeepPartial<User>): Promise<User> {
    return await this.userRepository.save(data);
  }
  public async create(data: DeepPartial<User>): Promise<User> {
    return this.userRepository.save(data);
  }

  public async findOneById(
    userId: string,
    filterCondition: FindOneOptions<User>
  ): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { userId },
      ...filterCondition,
    });
  }
  public async findAndUpdate(
    userId: string,
    data: DeepPartial<User>
  ): Promise<UpdateResult | null> {
    return await this.userRepository.update({ userId }, data);
  }
  public async findByCondition(
    filterCondition: FindOneOptions<User>
  ): Promise<User | null> {
    return await this.userRepository.findOne(filterCondition);
  }

  public async findWithRelations(
    relations: FindManyOptions<User>
  ): Promise<User[]> {
    return await this.userRepository.find(relations);
  }

  public async findAll(options?: FindManyOptions<User>): Promise<User[]> {
    return await this.userRepository.find(options);
  }

  public async remove(data: User): Promise<User> {
    return await this.userRepository.remove(data);
  }
}
