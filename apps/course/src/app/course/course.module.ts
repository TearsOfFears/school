import { Module } from '@nestjs/common';

import { CourseCommands } from './course.commands';
import { CourseService } from './course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseQueries } from './course.queries';
import { CourseRepository } from './repositories/courses.repository';
import { CourseEntity } from '@school/shared';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity])],
  controllers: [CourseCommands, CourseQueries],
  providers: [CourseService, CourseRepository],
})
export class CourseModule {}
