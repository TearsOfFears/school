import { Body, Controller } from '@nestjs/common';

import { CourseService } from './course.service';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { AccountCheckPayment, CourseCreate } from '@school/shared';

@Controller()
export class CourseCommands {
  constructor(private readonly courseService: CourseService) {}

  @RMQValidate()
  @RMQRoute(CourseCreate.topic)
  async checkPayment(
    @Body() dtoIn: CourseCreate.Request
  ): Promise<CourseCreate.Response> {
    const course = await this.courseService.create(dtoIn);
    return {
      course,
    };
  }
}
