import { Module } from '@nestjs/common';

import { PaymentCommands } from './payment.commands';
import { PaymentService } from './payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentQueries } from './payment.queries';
import { PaymentRepository } from './repositories/payment.repository';
import { PaymentEntity } from '@school/shared';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentEntity])],
  controllers: [PaymentCommands, PaymentQueries],
  providers: [PaymentService, PaymentRepository],
})
export class PaymentModule {}
