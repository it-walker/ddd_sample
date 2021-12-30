import { Inject, Injectable } from '@nestjs/common';

import { TaskDomain } from '@/domain/task.domain';
import { IPostponeTaskApplication } from '@/interfaces/tasks/applications/postpone.task.application.interface';
import { IPostponeTaskUseCase } from '@/interfaces/tasks/usecases/postpone.task.service.usecase';
import { TYPES } from '@/interfaces/types';

@Injectable()
export class PostponeTaskApplication implements IPostponeTaskApplication {
  constructor(
    @Inject(TYPES.services.IPostponeTaskService)
    private postponeTaskService: IPostponeTaskUseCase,
  ) {}

  async postpone(id: string): Promise<TaskDomain> {
    return this.postponeTaskService.postpone(id);
  }
}
