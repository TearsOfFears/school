import { IsUUID } from 'class-validator';
import { ICourse, ICourseUser } from '../../interfaces/course.interface';

export namespace CourseGetCourses {
  export const topic = 'course.get-courses.query';

  export class Request {
    @IsUUID()
    courseId: string;
  }

  export class Response {
    course: ICourse | null;
  }
}
