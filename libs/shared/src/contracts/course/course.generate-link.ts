import { IsUUID } from 'class-validator';
import { ICourse } from '../../interfaces/lib/course.interface';

export namespace CourseGetCourses {
  export const topic = 'course.get-courses.query';

  export class Request {
    @IsUUID()
    courseId: string;
  }

  export class Response {
    course: ICourse;
  }
}
