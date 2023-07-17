import { IsInt, IsString, IsUUID } from 'class-validator';
import { ICourse, ICourseUser } from '../../interfaces/course.interface';
import { Column } from 'typeorm';

export namespace CourseCreate {
  export const topic = 'course.create.command';

  export class Request {
    @IsString()
    title: string;
    @IsString()
    description: string;

    @IsString()
    banner: string;

    @IsString()
    hours: string;

    @IsInt()
    price: number;
  }

  export class Response {
    course: ICourse | null;
  }
}
