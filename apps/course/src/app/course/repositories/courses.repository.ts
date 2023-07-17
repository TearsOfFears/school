import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  Repository,
  UpdateResult,
} from 'typeorm';

import { CourseEntity } from '@school/shared';

@Injectable()
export class CourseRepository {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>
  ) {}
  public async create(data: DeepPartial<CourseEntity>): Promise<CourseEntity> {
    return await this.courseRepository.save(data);
  }

  public async findOneById(
    userId: string,
    filterCondition: FindOneOptions<CourseEntity>
  ): Promise<CourseEntity | null> {
    return await this.courseRepository.findOne({
      where: { userId },
      ...filterCondition,
    });
  }
  public async findAndUpdate(
    userId: string,
    data: DeepPartial<CourseEntity>
  ): Promise<UpdateResult | null> {
    return await this.courseRepository.update({ userId }, data);
  }
  public async findByCondition(
    filterCondition: FindOneOptions<CourseEntity>
  ): Promise<CourseEntity | null> {
    return await this.courseRepository.findOne(filterCondition);
  }

  public async findWithRelations(
    relations: FindManyOptions<CourseEntity>
  ): Promise<CourseEntity[]> {
    return await this.courseRepository.find(relations);
  }

  public async findAll(
    options?: FindManyOptions<CourseEntity>
  ): Promise<CourseEntity[]> {
    return await this.courseRepository.find(options);
  }

  public async remove(data: CourseEntity): Promise<CourseEntity> {
    return await this.courseRepository.remove(data);
  }
}
