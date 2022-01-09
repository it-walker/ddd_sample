import { IsNotEmpty, IsString } from 'class-validator';

/**
 * CreateTaskDto class
 */
export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  dueDate: Date;
}
