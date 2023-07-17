import {
  Column,
  DeepPartial,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { ICourse, PurchaseState, State } from '../interfaces/course.interface';

@Entity('course')
export class CourseEntity extends BaseEntity implements ICourse {
  constructor(input?: DeepPartial<CourseEntity>) {
    super(input);
  }
  @PrimaryGeneratedColumn('uuid')
  courseId: string;

  @Column()
  title: string;
  @Column()
  description: string;

  @Column()
  banner: string;

  @Column()
  hours: string;

  @Column()
  price: number;

  @Column({
    type: 'enum',
    enum: State,
    array: false,
    default: State.InDevelop,
  })
  state: State;
}
