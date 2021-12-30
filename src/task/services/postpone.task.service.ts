import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { TaskDomain } from '@/domain/task.domain';
import { Task } from '@/entities/task.entity';
import { IPostponeTaskUseCase } from '@/interfaces/tasks/usecases/postpone.task.service.usecase';

@Injectable()
export class PostponeTaskService implements IPostponeTaskUseCase {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    @InjectConnection() private connection: Connection,
  ) {}

  async postpone(id: string): Promise<TaskDomain> {
    return this.connection.transaction(async (manager) => {
      const taskRepository = manager.getRepository(Task);
      const task = await taskRepository.findOne(id);
      if (!task) throw new Error('error!');
      const taskDomain = TaskDomain.reconstruct(task);
      taskDomain.postpone();
      return await taskRepository.save(taskDomain);
    });
  }
}
