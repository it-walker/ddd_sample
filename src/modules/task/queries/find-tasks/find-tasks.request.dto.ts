import { ArgsType, Field, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { FindTasks } from '@src/interface-adapters/interfaces/task/find-tasks.interface'
import { TaskStatus } from '@src/modules/task/domain/entities/task.type'
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator'

@ArgsType() // <- only if you are using GraphQL
@InputType()
/**
 * FindTasksRequest class
 */
export class FindTasksRequest implements FindTasks {
  @ApiProperty({ example: 'France', description: 'Country of residence' })
  @MaxLength(50)
  @IsOptional()
  @IsString()
  @Field({ nullable: true }) // <- only if you are using GraphQL
  readonly name: string;

  @ApiProperty({ example: '2021122100000000', description: '期日' })
  @IsOptional()
  @IsDate()
  @Field({ nullable: true }) // <- only if you are using GraphQL
  readonly dueDate: Date;

  @ApiProperty({ example: '1', description: '延長回数' })
  @IsOptional()
  @IsNumber()
  @MaxLength(1)
  @Field({ nullable: true }) // <- only if you are using GraphQL
  readonly postponeCount: number;

  @ApiProperty({ example: 'Completed', description: 'タスクステータス' })
  @IsOptional()
  readonly status: TaskStatus;
}

/**
 * FindTasksHttpRequest class
 */
export class FindTasksHttpRequest
  extends FindTasksRequest
  implements FindTasks { }
