import { Body, Controller } from '@nestjs/common';

import { PaymentService } from './payment.service';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { PaymentGenerateLink } from '@school/shared';

@Controller()
export class PaymentCommands {
  constructor(private readonly paymentService: PaymentService) {}

  @RMQValidate()
  @RMQRoute(PaymentGenerateLink.topic)
  async checkPayment(
    @Body() dtoIn: PaymentGenerateLink.Request
  ): Promise<PaymentGenerateLink.Response> {
    // const paymentLink = await this.paymentService.generateLink(dtoIn);
    return {
      paymentLink: 'some link',
    };
  }
}
