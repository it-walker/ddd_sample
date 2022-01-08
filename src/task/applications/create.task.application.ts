import { Inject, Injectable } from '@nestjs/common';
import { TaskDomain } from '@src/domain/task.domain';
import { ICreateTaskApplication } from '@src/interfaces/tasks/applications/create.task.application.interface';
import { ICreateTaskUseCase } from '@src/interfaces/tasks/usecases/create.task.service.usecase';
import { TYPES } from '@src/interfaces/types';

import { CreateTaskDto } from '../dto/create.task.dto';

@Injectable()
export class CreateTaskApplication implements ICreateTaskApplication {
  constructor(
    @Inject(TYPES.services.ICreateTaskService)
    private taskService: ICreateTaskUseCase,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<TaskDomain> {
    return this.taskService.create(createTaskDto.name, createTaskDto.dueDate);
  }
}
