import {
  Column,
  DeepPartial,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { ICourse, PurchaseState } from '../interfaces/course.interface';
import { IUser, UserRole } from '../interfaces/user.interface';
import { IDomainEvent } from '../interfaces/events.interface';
import { AccountChangedCourse } from '../contracts/account/account.changed-course';
import { UserEntity } from './user.entity';

@Entity('course')
export class CourseEntity extends BaseEntity implements ICourse {
  events: IDomainEvent[] = [];

  constructor(input?: DeepPartial<CourseEntity>) {
    super(input);
  }
  @PrimaryGeneratedColumn('uuid')
  courseId: string;

  @Column({
    type: 'enum',
    enum: PurchaseState,
    array: false,
    default: PurchaseState.WaitingForPayment,
  })
  purchaseState: PurchaseState;

  @ManyToOne(() => UserEntity, (user) => user.courses)
  user: UserEntity;
}
