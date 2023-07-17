import { IsInt, IsString } from 'class-validator';

export class CourseCreateDto {
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
