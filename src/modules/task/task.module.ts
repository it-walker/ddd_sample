import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateTaskCliController } from '@src/modules/task/commands/create-task/create-task.cli.controller';
import { CreateTaskGraphqlResolver } from '@src/modules/task/commands/create-task/create-task.graphql-resolver';
import { CreateTaskHttpController } from '@src/modules/task/commands/create-task/create-task.http.controller';
import { CreateTaskMessageController } from '@src/modules/task/commands/create-task/create-task.message.controller';
import { CreateTaskService } from '@src/modules/task/commands/create-task/create-task.service';
import { DeleteTaskHttpController } from '@src/modules/task/commands/delete-task/delete-task.http-controller';
import { DeleteTaskService } from '@src/modules/task/commands/delete-task/delete-task.service';
import { TaskOrmEntity } from '@src/modules/task/database/task.orm-entity';
import { TaskRepository } from '@src/modules/task/database/task.repository';
import { FindTasksGraphqlResolver } from '@src/modules/task/queries/find-tasks/find-tasks.graphql-resolver';
import { FindTasksHttpController } from '@src/modules/task/queries/find-tasks/find-tasks.http.controller';
import { FindTasksQueryHandler } from '@src/modules/task/queries/find-tasks/find-tasks.query-handler';
import { createTaskCliLoggerProvider } from '@src/modules/task/task.providers';

const httpControllers = [
  CreateTaskHttpController,
  DeleteTaskHttpController,
  FindTasksHttpController,
];

const messageControllers = [CreateTaskMessageController];

const cliControllers = [CreateTaskCliController];

const graphqlResolvers = [CreateTaskGraphqlResolver, FindTasksGraphqlResolver];

const repositories = [TaskRepository];

const commandHandlers = [CreateTaskService, DeleteTaskService];

const queryHandlers = [FindTasksQueryHandler];

@Module({
  imports: [TypeOrmModule.forFeature([TaskOrmEntity]), CqrsModule],
  controllers: [...httpControllers, ...messageControllers],
  providers: [
    ...cliControllers,
    ...repositories,
    ...graphqlResolvers,
    ...commandHandlers,
    ...queryHandlers,
    createTaskCliLoggerProvider,
  ],
})
/**
 * TaskModule class
 */
export class TaskModule {}
