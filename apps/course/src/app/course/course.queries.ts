import { Body, Controller } from '@nestjs/common';

import { CourseService } from './course.service';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { CourseGetCourses } from '@school/shared';

@Controller()
export class CourseQueries {
  constructor(private readonly courseService: CourseService) {}

  @RMQValidate()
  @RMQRoute(CourseGetCourses.topic)
  async checkPayment(
    @Body() { courseId }: CourseGetCourses.Request
  ): Promise<CourseGetCourses.Response> {
    const course = await this.courseService.getCourseById(courseId);
    return {
      course,
    };
  }
}
