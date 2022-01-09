import {TaskDomain} from '@src/domain/task.domain';
import {CreateTaskDto} from '@src/task/dto/create.task.dto';

export interface ICreateTaskApplication {
  create(createTaskDto: CreateTaskDto): Promise<TaskDomain>;
}
