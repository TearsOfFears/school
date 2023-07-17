import {
  Column,
  DeepPartial,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { ICourseUser, PurchaseState } from '../interfaces/course.interface';
import { UserEntity } from './user.entity';

@Entity('courseUser')
export class CourseUserEntity extends BaseEntity implements ICourseUser {
  constructor(input?: DeepPartial<CourseUserEntity>) {
    super(input);
  }
  @PrimaryGeneratedColumn('uuid')
  courseId: string;
  @Column('uuid')
  courseUserId: string;

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
