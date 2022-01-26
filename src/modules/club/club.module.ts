import { createClubCliLoggerProvider } from '@modules/club/club.providers'
import { CreateClubCliController } from '@modules/club/commands/create-club/create-club.cli.controller'
import { CreateClubGraphqlResolver } from '@modules/club/commands/create-club/create-club.graphql-resolver'
import { CreateClubHttpController } from '@modules/club/commands/create-club/create-club.http.controller'
import { CreateClubMessageController } from '@modules/club/commands/create-club/create-club.message.controller'
import { CreateClubService } from '@modules/club/commands/create-club/create-club.service'
import { DeleteClubHttpController } from '@modules/club/commands/delete-club/delete-club.http-controller'
import { DeleteClubService } from '@modules/club/commands/delete-club/delete-club.service'
import { ClubOrmEntity } from '@modules/club/database/club.orm-entity'
import { ClubRepository } from '@modules/club/database/club.repository'
import { FindClubsGraphqlResolver } from '@modules/club/queries/find-clubs/find-clubs.graphql-resolver'
import { FindClubsHttpController } from '@modules/club/queries/find-clubs/find-clubs.http.controller'
import { FindClubsQueryHandler } from '@modules/club/queries/find-clubs/find-clubs.query-handler'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'

const httpControllers = [
  CreateClubHttpController,
  DeleteClubHttpController,
  FindClubsHttpController,
]

const messageControllers = [CreateClubMessageController]

const cliControllers = [CreateClubCliController]

const graphqlResolvers = [CreateClubGraphqlResolver, FindClubsGraphqlResolver]

const repositories = [ClubRepository]

const commandHandlers = [CreateClubService, DeleteClubService]

const queryHandlers = [FindClubsQueryHandler]

@Module({
  imports: [TypeOrmModule.forFeature([ClubOrmEntity]), CqrsModule],
  controllers: [...httpControllers, ...messageControllers],
  providers: [
    ...cliControllers,
    ...repositories,
    ...graphqlResolvers,
    ...commandHandlers,
    ...queryHandlers,
    createClubCliLoggerProvider,
  ],
})
export class ClubModule { }
