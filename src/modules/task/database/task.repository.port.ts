import { RepositoryPort } from '@src/libs/ddd/domain/ports/repository.ports';

import { TaskEntity, TaskProps } from '../domain/entities/task.entity';

export interface TaskRepositoryPort
  extends RepositoryPort<TaskEntity, TaskProps> {
  findOneByIdOrThrow(id: string): Promise<TaskEntity>;
  findOneByTaskNameOrThrow(name: string): Promise<TaskEntity>;
  exists(name: string): Promise<boolean>;
}
