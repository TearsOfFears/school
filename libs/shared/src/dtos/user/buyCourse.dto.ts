import { IsUUID } from 'class-validator';

export class BuyCourseDto {
  @IsUUID()
  userId: string;
  @IsUUID()
  courseId: string;
}
