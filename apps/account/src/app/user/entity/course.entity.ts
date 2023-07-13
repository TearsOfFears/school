import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ICourse, PurchaseState } from '@school/shared';
import { User } from './user.entity';

@Entity('course')
export class Course implements ICourse {
  @PrimaryGeneratedColumn('uuid')
  courseId: string;

  @Column({
    type: 'enum',
    enum: PurchaseState,
    array: true,
    default: [PurchaseState.WaitingForPayment],
  })
  purchaseState: PurchaseState;

  @ManyToOne(() => User, (user) => user.courses)
  user: User;

  @CreateDateColumn()
  createdAt?: Date;

  @CreateDateColumn()
  updatedAt?: Date;
}
