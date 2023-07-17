import { Body, Controller } from '@nestjs/common';

import { PaymentService } from './payment.service';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { PaymentCheck, PaymentStatus } from '@school/shared';

@Controller()
export class PaymentQueries {
  constructor(private readonly courseService: PaymentService) {}

  @RMQValidate()
  @RMQRoute(PaymentCheck.topic)
  async checkPayment(
    @Body() { courseId, userId }: PaymentCheck.Request
  ): Promise<PaymentCheck.Response> {
    const course = await this.courseService.getCourseById(courseId);
    return {
      status: PaymentStatus.Success,
    };
  }
}
