export enum UserRole {
  Student = 'Student',
  Teacher = 'Teacher',
}

export interface IUserInterface {
  userId: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
  email: string;
  refreshToken: string;
  restoreLink: string;

  roles: UserRole[];

  isActivated: boolean;

  createdAt: Date;

  updatedAt: Date;
}
