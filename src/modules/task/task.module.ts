import { CreateTaskCliController } from '@modules/task/commands/create-task/create-task.cli.controller'
import { CreateTaskGraphqlResolver } from '@modules/task/commands/create-task/create-task.graphql-resolver'
import { CreateTaskHttpController } from '@modules/task/commands/create-task/create-task.http.controller'
import { CreateTaskMessageController } from '@modules/task/commands/create-task/create-task.message.controller'
import { CreateTaskService } from '@modules/task/commands/create-task/create-task.service'
import { DeleteTaskHttpController } from '@modules/task/commands/delete-task/delete-task.http-controller'
import { DeleteTaskService } from '@modules/task/commands/delete-task/delete-task.service'
import { TaskOrmEntity } from '@modules/task/database/task.orm-entity'
import { TaskRepository } from '@modules/task/database/task.repository'
import { FindTasksGraphqlResolver } from '@modules/task/queries/find-tasks/find-tasks.graphql-resolver'
import { FindTasksHttpController } from '@modules/task/queries/find-tasks/find-tasks.http.controller'
import { FindTasksQueryHandler } from '@modules/task/queries/find-tasks/find-tasks.query-handler'
import { createTaskCliLoggerProvider } from '@modules/task/task.providers'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'

const httpControllers = [
  CreateTaskHttpController,
  DeleteTaskHttpController,
  FindTasksHttpController,
]

const messageControllers = [CreateTaskMessageController]

const cliControllers = [CreateTaskCliController]

const graphqlResolvers = [CreateTaskGraphqlResolver, FindTasksGraphqlResolver]

const repositories = [TaskRepository]

const commandHandlers = [CreateTaskService, DeleteTaskService]

const queryHandlers = [FindTasksQueryHandler]

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
export class TaskModule { }
