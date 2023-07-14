import { IsUUID } from 'class-validator';
import { ICourse } from '../../interfaces/course.interface';

export namespace AccountUserCourses {
  export const topic = 'account.user-courses.query';

  export class Request {
    @IsUUID()
    userId: string;
  }

  export class Response {
    courses: ICourse[];
  }
}
