import { Inject, Injectable } from '@nestjs/common';
import { TaskDomain } from '@src/domain/task.domain';
import { ICreateTaskApplication } from '@src/interfaces/tasks/applications/create.task.application.interface';
import { ICreateTaskUseCase } from '@src/interfaces/tasks/usecases/create.task.service.usecase';
import { TYPES } from '@src/interfaces/types';

import { CreateTaskDto } from '../dto/create.task.dto';

@Injectable()
/**
 * CreateTaskApplication class
 */
export class CreateTaskApplication implements ICreateTaskApplication {
  /**
   * constructor
   * @param {ICreateTaskUseCase} taskService
   */
  constructor(
    @Inject(TYPES.services.ICreateTaskService)
    private taskService: ICreateTaskUseCase,
  ) {}

  /**
   *
   * @param {CreateTaskDto} createTaskDto
   * @return {Promise<TaskDomain>}
   */
  async create(createTaskDto: CreateTaskDto): Promise<TaskDomain> {
    return this.taskService.create(createTaskDto.name, createTaskDto.dueDate);
  }
}
