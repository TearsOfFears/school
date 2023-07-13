import { ICourse } from './course.interface';

export enum UserRole {
  Student = 'Student',
  Teacher = 'Teacher',
}

export interface IUser {
  userId: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
  email: string;
  refreshToken: string;
  restoreLink: string;

  roles: UserRole[];

  courses: ICourse[];

  isActivated: boolean;

  createdAt: Date;

  updatedAt: Date;
}
