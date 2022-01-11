import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { CreateTask } from '@src/interface-adapters/interfaces/task/create.task.interface';
import { IsDateString, MaxLength, MinLength } from 'class-validator';

@ArgsType()
@InputType()
/**
 * CreateTaskRequest class
 */
export class CreateTaskRequest implements CreateTask {
  @ApiProperty({
    example: 'task name',
    description: 'Task name',
  })
  @MaxLength(20)
  @MinLength(5)
  @Field()
  readonly name: string;

  @ApiProperty({
    example: '20211212 00:00:00',
    description: 'Task dueDate',
  })
  @IsDateString()
  readonly dueDate: Date;
}

/**
 * CreateTaskHttpRequest class
 */
export class CreateTaskHttpRequest
  extends CreateTaskRequest
  implements CreateTask {}

/**
 * CreateTaskMessageRequest class
 */
export class CreateTaskMessageRequest
  extends CreateTaskRequest
  implements CreateTask {}
