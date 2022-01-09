import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { TaskDomain } from '@src/domain/task.domain';
import { Task } from '@src/entities/task.entity';
import { IPostponeTaskUseCase } from '@src/interfaces/tasks/usecases/postpone.task.service.usecase';
import { Connection, Repository } from 'typeorm';

@Injectable()
/**
 * PostponeTaskService class
 */
export class PostponeTaskService implements IPostponeTaskUseCase {
  /**
   * constructor
   * @param {Repository<Task>} taskRepository
   * @param {Connection} connection
   */
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    @InjectConnection() private connection: Connection,
  ) {}

  /**
   *
   * @param {string} id
   * @return {Promise<TaskDomain>}
   */
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
