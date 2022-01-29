import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CreateStudentCliController } from '@modules/student/commands/create-student/create-student.cli.controller'
import { CreateStudentGraphqlResolver } from '@modules/student/commands/create-student/create-student.graphql-resolver'
import { CreateStudentHttpController } from '@modules/student/commands/create-student/create-student.http.controller'
import { CreateStudentMessageController } from '@modules/student/commands/create-student/create-student.message.controller'
import { CreateStudentService } from '@modules/student/commands/create-student/create-student.service'
import { DeleteStudentHttpController } from '@modules/student/commands/delete-student/delete-student.http-controller'
import { DeleteStudentService } from '@modules/student/commands/delete-student/delete-student.service'
import { StudentOrmEntity } from '@modules/student/database/student.orm-entity'
import { StudentRepository } from '@modules/student/database/student.repository'
import { FindStudentsGraphqlResolver } from '@modules/student/queries/find-students/find-students.graphql-resolver'
import { FindStudentsHttpController } from '@modules/student/queries/find-students/find-students.http.controller'
import { FindStudentsQueryHandler } from '@modules/student/queries/find-students/find-students.query-handler'
import { createStudentCliLoggerProvider } from '@modules/student/student.providers'

const httpControllers = [
  CreateStudentHttpController,
  DeleteStudentHttpController,
  FindStudentsHttpController,
]

const messageControllers = [CreateStudentMessageController]

const cliControllers = [CreateStudentCliController]

const graphqlResolvers = [
  CreateStudentGraphqlResolver,
  FindStudentsGraphqlResolver,
]

const repositories = [StudentRepository]

const commandHandlers = [CreateStudentService, DeleteStudentService]

const queryHandlers = [FindStudentsQueryHandler]

@Module({
  imports: [TypeOrmModule.forFeature([StudentOrmEntity]), CqrsModule],
  controllers: [...httpControllers, ...messageControllers],
  providers: [
    ...cliControllers,
    ...repositories,
    ...graphqlResolvers,
    ...commandHandlers,
    ...queryHandlers,
    createStudentCliLoggerProvider,
  ],
})
export class StudentModule {}
