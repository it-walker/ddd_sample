import { ResponseBase } from '@libs/ddd/interface-adapters/base-classes/response.base';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Task } from '@src/interface-adapters/interfaces/task/task.interface';

import { TaskEntity } from '../domain/entities/task.entity';
import { TaskStatus } from '../domain/entities/task.type';

@ObjectType() // only if you are using graphql
/**
 * TaskResponse class
 */
export class TaskResponse extends ResponseBase implements Task {
  /**
   * constructor
   * @param {TaskEntity} task
   */
  constructor(task: TaskEntity) {
    super(task);
    const props = task.getPropsCopy();
    this.name = props.name.value;
    this.dueDate = props.dueDate.value;
    this.postponeCount = props.postponeCount.value;
    this.status = props.status;
  }

  @ApiProperty({
    example: 'joh-doe@gmail.com',
    description: 'Task\'s email address',
  })
  @Field() // <- only if you are using GraphQL
  name: string;

  @ApiProperty({
    example: '2021-12-12 00:00:00',
    description: 'Task\'s dueDate',
  })
  @Field() // <- only if you are using GraphQL
  dueDate: Date;

  @ApiProperty({
    example: '2',
    description: '期限延長回数',
  })
  @Field() // <- only if you are using GraphQL
  postponeCount: number;

  @ApiProperty({
    example: 'TaskStatus.Completed',
    description: 'タスクステータス',
  })
  @Field() // <- only if you are using GraphQL
  status: TaskStatus;
}

/**
 * TaskHttpResponse class
 */
export class TaskHttpResponse extends TaskResponse implements Task {}
