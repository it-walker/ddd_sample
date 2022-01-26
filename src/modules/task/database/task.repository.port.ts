import { TaskEntity, TaskProps } from '@modules/task/domain/entities/task.entity'
import { RepositoryPort } from '@src/libs/ddd/domain/ports/repository.ports'

export interface TaskRepositoryPort
  extends RepositoryPort<TaskEntity, TaskProps> {
  findOneByIdOrThrow(id: string): Promise<TaskEntity>;
  findOneByTaskNameOrThrow(name: string): Promise<TaskEntity>;
  exists(name: string): Promise<boolean>;
}
