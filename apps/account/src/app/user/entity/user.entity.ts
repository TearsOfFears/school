import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ICourse, IUser, PurchaseState, UserRole } from '@school/shared';
import { Course } from './course.entity';

@Entity('user')
export class User implements IUser {
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

  @OneToMany(() => Course, (course) => course.user)
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

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

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
  }
}
