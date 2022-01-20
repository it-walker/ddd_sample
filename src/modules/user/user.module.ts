import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CreateUserCliController } from '@modules/user/commands/create-user/create-user.cli.controller'
import { CreateUserGraphqlResolver } from '@modules/user/commands/create-user/create-user.graphql-resolver'
import { CreateUserHttpController } from '@modules/user/commands/create-user/create-user.http.controller'
import { CreateUserMessageController } from '@modules/user/commands/create-user/create-user.message.controller'
import { CreateUserService } from '@modules/user/commands/create-user/create-user.service'
import { DeleteUserHttpController } from '@modules/user/commands/delete-user/delete-user.http-controller'
import { DeleteUserService } from '@modules/user/commands/delete-user/delete-user.service'
import { UserOrmEntity } from '@modules/user/database/user.orm-entity'
import { UserRepository } from '@modules/user/database/user.repository'
import { FindUsersGraphqlResolver } from '@modules/user/queries/find-users/find-users.graphql-resolver'
import { FindUsersHttpController } from '@modules/user/queries/find-users/find-users.http.controller'
import { FindUsersQueryHandler } from '@modules/user/queries/find-users/find-users.query-handler'
import { createUserCliLoggerProvider } from '@modules/user/user.providers'

const httpControllers = [
  CreateUserHttpController,
  DeleteUserHttpController,
  FindUsersHttpController,
]

const messageControllers = [CreateUserMessageController]

const cliControllers = [CreateUserCliController]

const graphqlResolvers = [CreateUserGraphqlResolver, FindUsersGraphqlResolver]

const repositories = [UserRepository]

const commandHandlers = [CreateUserService, DeleteUserService]

const queryHandlers = [FindUsersQueryHandler]

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity]), CqrsModule],
  controllers: [...httpControllers, ...messageControllers],
  providers: [
    ...cliControllers,
    ...repositories,
    ...graphqlResolvers,
    ...commandHandlers,
    ...queryHandlers,
    createUserCliLoggerProvider,
  ],
})
/**
 * UserModule class
 */
export class UserModule { }
