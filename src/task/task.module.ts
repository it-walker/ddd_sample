import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Task} from '@src/entities/task.entity';
import {TYPES} from '@src/interfaces/types';

import {CreateTaskApplication} from './applications/create.task.application';
import {PostponeTaskApplication} from './applications/postpone.task.application';
import {CreateTaskService} from './services/create.task.service';
import {PostponeTaskService} from './services/postpone.task.service';
import {TaskController} from './task.controller';

const createTaskApp = {
  provide: TYPES.applications.ICreateTaskApplication,
  useClass: CreateTaskApplication,
};
const postponeTaskApp = {
  provide: TYPES.applications.IPostponeTaskApplication,
  useClass: PostponeTaskApplication,
};

const createTaskService = {
  provide: TYPES.services.ICreateTaskService,
  useClass: CreateTaskService,
};
const postponeTaskService = {
  provide: TYPES.services.IPostponeTaskService,
  useClass: PostponeTaskService,
};

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [
    createTaskApp,
    postponeTaskApp,
    createTaskService,
    postponeTaskService,
  ],
})
export class TaskModule {}
