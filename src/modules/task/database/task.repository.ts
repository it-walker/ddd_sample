import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryParams } from '@src/libs/ddd/domain/ports/repository.ports';
import {
  TypeormRepositoryBase,
  WhereCondition,
} from '@src/libs/ddd/infrastructure/database/base-classes/typeorm.repository.base';
import { removeUndefinedProps } from '@src/libs/utils/remove-undefined-props.util';
import { Repository } from 'typeorm';

import { TaskEntity, TaskProps } from '../domain/entities/task.entity';
import { FindTasksQuery } from '../queries/find-tasks/find-tasks.query';
import { TaskOrmEntity } from './task.orm-entity';
import { TaskOrmMapper } from './task.orm-mapper';
import { TaskRepositoryPort } from './task.repository.port';

@Injectable()
/**
 * TaskRepository class
 */
export class TaskRepository
  extends TypeormRepositoryBase<TaskEntity, TaskProps, TaskOrmEntity>
  implements TaskRepositoryPort
{
  protected relations: string[] = [];
  /**
   * constructor
   * @param {TaskRepository} taskRepository
   */
  constructor(
    @InjectRepository(TaskOrmEntity)
    private readonly taskRepository: Repository<TaskOrmEntity>,
  ) {
    super(
      taskRepository,
      new TaskOrmMapper(TaskEntity, TaskOrmEntity),
      new Logger('TaskRepository'),
    );
  }

  /**
   *
   * @param {string} id
   * @return {Promise<TaskOrmEntity | undefined>}
   */
  private async findOneById(id: string): Promise<TaskOrmEntity | undefined> {
    const task = await this.taskRepository.findOne({
      where: { id },
    });

    return task;
  }

  /**
   *
   * @param {string} id
   * @return {Promise<TaskEntity>}
   */
  async findOneByIdOrThrow(id: string): Promise<TaskEntity> {
    const task = await this.findOneById(id);
    if (!task) {
      throw new NotFoundException(`Task with id '${id} not found`);
    }
    return this.mapper.toDomainEntity(task);
  }

  /**
   *
   * @param {string} name
   * @return {Promise<TaskOrmEntity | undefined>}
   */
  private async findOneByTaskName(
    name: string,
  ): Promise<TaskOrmEntity | undefined> {
    const task = await this.taskRepository.findOne({
      where: { name },
    });
    return task;
  }

  /**
   *
   * @param {string} name
   * @return {Promise<TaskEntity>}
   */
  async findOneByTaskNameOrThrow(name: string): Promise<TaskEntity> {
    const task = await this.findOneByTaskName(name);
    if (!task) {
      throw new NotFoundException(`Task with name '${name}' not found`);
    }
    return this.mapper.toDomainEntity(task);
  }

  /**
   *
   * @param {string} name
   * @return {Promise<boolean>}
   */
  async exists(name: string): Promise<boolean> {
    const found = await this.findOneByTaskName(name);
    if (found) {
      return true;
    }
    return false;
  }

  /**
   *
   * @param {FindTasksQuery} query
   * @return {Promise<TaskEntity[]>}
   */
  async findTasks(query: FindTasksQuery): Promise<TaskEntity[]> {
    const where: QueryParams<TaskOrmEntity> = removeUndefinedProps(query);
    const users = await this.repository.find({ where });
    return users.map((user) => this.mapper.toDomainEntity(user));
  }

  /**
   *
   * @param {QueryParams<TaskProps>} params
   * @return {WhereCondition<TaskOrmEntity>}
   */
  protected prepareQuery(
    params: QueryParams<TaskProps>,
  ): WhereCondition<TaskOrmEntity> {
    const where: QueryParams<TaskOrmEntity> = {};
    if (params.id) {
      where.id = params.id.value;
    }
    if (params.createdAt) {
      where.createdAt = params.createdAt.value;
    }
    if (params.dueDate) {
      where.dueDate = params.dueDate.value;
    }
    return where;
  }
}
