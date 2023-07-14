import {
  Column,
  DeepPartial,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { ICourse, PurchaseState } from '../interfaces/course.interface';
import { IUser, UserRole } from '../interfaces/user.interface';
import { IDomainEvent } from '../interfaces/events.interface';
import { AccountChangedCourse } from '../contracts/account/account.changed-course';
import { CourseEntity } from './course.entity';

@Entity('user')
export class UserEntity extends BaseEntity implements IUser {
  events: IDomainEvent[] = [];

  constructor(input?: DeepPartial<UserEntity>) {
    super(input);
  }
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ select: false })
  passwordHash: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ nullable: true })
  restoreLink: string;

  @OneToMany(() => CourseEntity, (course) => course.user)
  courses: ICourse[];

  @Column({
    type: 'enum',
    enum: UserRole,
    array: true,
    default: [UserRole.Student],
  })
  roles: UserRole[];

  @Column({ default: false })
  isActivated: boolean;

  public setCourseStatus(courseId: string, state: PurchaseState) {
    const exist = this.courses.find((c) => c.courseId === courseId);
    if (!exist) {
      this.courses.push({
        courseId,
        purchaseState: state,
      });
      return this;
    }
    if (state === PurchaseState.Canceled) {
      this.courses = this.courses.filter((c) => c.courseId !== courseId);
      return this;
    }
    this.courses = this.courses.map((c) => {
      if (c.courseId === courseId) {
        c.purchaseState = state;
        return c;
      }
      return c;
    });
    this.events.push({
      topic: AccountChangedCourse.topic,
      data: { courseId, userId: this.userId, state },
    });
    return this;
  }

  public getCourseState(courseId: string): PurchaseState {
    return (
      this.courses.find((c) => c.courseId === courseId)?.purchaseState ??
      PurchaseState.Started
    );
  }
}
