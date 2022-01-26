import { CommandHandlerBase } from '@libs/ddd/domain/base-classes/command-handler.base'
import { Result } from '@libs/ddd/domain/utils/result.util'
import { ID } from '@libs/ddd/domain/value-objects/id.value-object'
import { CreateStudentCommand } from '@modules/student/commands/create-student/create-student.command'
import { StudentRepositoryPort } from '@modules/student/database/student.repository.port'
import { StudentEntity } from '@modules/student/domain/entities/student.entity'
import { StudentName } from '@modules/student/domain/value-objects/student.name.value-object'
import { StudentAlreadyExistsError } from '@modules/student/errors/student.errors'
import { CommandHandler } from '@nestjs/cqrs'
import { UnitOfWork } from '@src/infrastructure/database/unit-of-work/unit-of-work'

@CommandHandler(CreateStudentCommand)
export class CreateStudentService extends CommandHandlerBase {
  /**
   * constructor
   * @param {UnitOfWorkModule} unitOfWork
   */
  constructor(protected readonly unitOfWork: UnitOfWork) {
    super(unitOfWork)
  }

  /**
   *
   * @param {CreateStudentCommand} command
   * @return {Promise<Result<ID, UserAlreadyExistsError>>}
   */
  async handle(
    command: CreateStudentCommand,
  ): Promise<Result<ID, StudentAlreadyExistsError>> {
    const studentRepository: StudentRepositoryPort = this.unitOfWork.getStudentRepository(
      command.correlationId,
    )
    if (await studentRepository.exists(command.name)) {
      return Result.err(new StudentAlreadyExistsError())
    }

    const student = StudentEntity.create({
      name: new StudentName(command.name),
    })

    student.someBusinessLogic()

    const created = await studentRepository.save(student)
    return Result.ok(created.id)
  }
}
