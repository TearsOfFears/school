import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { UserRole } from '@school/shared';

@Entity('user')
export class User {
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
}
