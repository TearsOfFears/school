import {
  Column,
  DeepPartial,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { ICourseUser, PurchaseState } from '../interfaces/course.interface';
import { IUser, UserRole } from '../interfaces/user.interface';
import { IDomainEvent } from '../interfaces/events.interface';
import { AccountChangedCourse } from '../contracts/account/account.changed-course';
import { CourseEntity } from './course.entity';
import { CourseUserEntity } from './courseUser.entity';
import { IPayment } from '../interfaces/payment.interface';

@Entity('payment')
export class PaymentEntity extends BaseEntity implements IPayment {
  constructor(input?: DeepPartial<PaymentEntity>) {
    super(input);
  }
  @PrimaryGeneratedColumn('uuid')
  paymentId: string;
}
