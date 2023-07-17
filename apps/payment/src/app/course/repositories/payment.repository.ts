import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  Repository,
  UpdateResult,
} from 'typeorm';

import { PaymentEntity } from '@school/shared';

@Injectable()
export class PaymentRepository {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly courseRepository: Repository<PaymentEntity>
  ) {}
  public async create(
    data: DeepPartial<PaymentEntity>
  ): Promise<PaymentEntity> {
    return await this.courseRepository.save(data);
  }

  public async findOneById(
    userId: string,
    filterCondition: FindOneOptions<PaymentEntity>
  ): Promise<PaymentEntity | null> {
    return await this.courseRepository.findOne({
      where: { userId },
      ...filterCondition,
    });
  }
  public async findAndUpdate(
    userId: string,
    data: DeepPartial<PaymentEntity>
  ): Promise<UpdateResult | null> {
    return await this.courseRepository.update({ userId }, data);
  }
  public async findByCondition(
    filterCondition: FindOneOptions<PaymentEntity>
  ): Promise<PaymentEntity | null> {
    return await this.courseRepository.findOne(filterCondition);
  }

  public async findWithRelations(
    relations: FindManyOptions<PaymentEntity>
  ): Promise<PaymentEntity[]> {
    return await this.courseRepository.find(relations);
  }

  public async findAll(
    options?: FindManyOptions<PaymentEntity>
  ): Promise<PaymentEntity[]> {
    return await this.courseRepository.find(options);
  }

  public async remove(data: PaymentEntity): Promise<PaymentEntity> {
    return await this.courseRepository.remove(data);
  }
}
