import { Inject, Injectable } from '@nestjs/common';

import { TaskDomain } from '@/domain/task.domain';
import { ICreateTaskApplication } from '@/interfaces/tasks/applications/create.task.application.interface';
import { ICreateTaskUseCase } from '@/interfaces/tasks/usecases/create.task.service.usecase';
import { TYPES } from '@/interfaces/types';

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
