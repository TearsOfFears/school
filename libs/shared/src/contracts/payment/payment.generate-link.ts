import { IsNumber, IsUUID } from 'class-validator';

export namespace PaymentGenerateLink {
  export const topic = 'payment.generate-link.command';

  export class Request {
    @IsUUID()
    courseId: string;

    @IsUUID()
    userId: string;

    @IsNumber()
    suma: number;
  }

  export class Response {
    paymentLink: string;
  }
}
