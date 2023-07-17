import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CourseRepository } from './repositories/courses.repository';
import { FindOneOptions } from 'typeorm';
import { CourseCreateDto, CourseEntity } from '@school/shared';

@Injectable()
export class CourseService {
  constructor(
    private readonly courseRepository: CourseRepository // private readonly userEventEmitter: UserEventEmitter
  ) {}
  public async create(dtoIn: CourseCreateDto) {
    try {
      return await this.courseRepository.create(dtoIn);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  async getCourseById(
    courseId: string,
    options?: FindOneOptions<CourseEntity>
  ) {
    try {
      return await this.courseRepository.findOneById(courseId, options);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
