import { Inject, Injectable } from '@nestjs/common';
import { TaskDomain } from '@src/domain/task.domain';
import { IPostponeTaskApplication } from '@src/interfaces/tasks/applications/postpone.task.application.interface';
import { IPostponeTaskUseCase } from '@src/interfaces/tasks/usecases/postpone.task.service.usecase';
import { TYPES } from '@src/interfaces/types';

@Injectable()
/**
 * PostponeTaskApplication
 */
export class PostponeTaskApplication implements IPostponeTaskApplication {
  /**
   * constructor
   * @param {IPostponeTaskUseCase} postponeTaskService
   */
  constructor(
    @Inject(TYPES.services.IPostponeTaskService)
    private postponeTaskService: IPostponeTaskUseCase,
  ) {}

  /**
   *
   * @param {string} id
   * @return {Promise<TaskDomain>}
   */
  async postpone(id: string): Promise<TaskDomain> {
    return this.postponeTaskService.postpone(id);
  }
}
