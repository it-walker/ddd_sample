import { TaskDomain } from '@/domain/task.domain';
import { CreateTaskDto } from '@/task/dto/create.task.dto';

export interface ICreateTaskApplication {
  create(createTaskDto: CreateTaskDto): Promise<TaskDomain>;
}
