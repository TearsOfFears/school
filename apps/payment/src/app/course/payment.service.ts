import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PaymentRepository } from './repositories/payment.repository';
import { FindOneOptions } from 'typeorm';
import { CourseCreateDto, PaymentEntity } from '@school/shared';

@Injectable()
export class PaymentService {
  constructor(
    private readonly paymentRepository: PaymentRepository // private readonly userEventEmitter: UserEventEmitter
  ) {}
  public async create(dtoIn: CourseCreateDto) {
    try {
      return await this.paymentRepository.create(dtoIn);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  public async generateLink(dtoIn: CourseCreateDto) {
    try {
      return await this.paymentRepository.create(dtoIn);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  async getCourseById(
    courseId: string,
    options?: FindOneOptions<PaymentEntity>
  ) {
    try {
      return await this.paymentRepository.findOneById(courseId, options);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
