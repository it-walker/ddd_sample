import { Inject } from '@nestjs/common'
import { CommandHandler } from '@nestjs/cqrs'

import { DeleteStudentCommand } from '@modules/student/commands/delete-student/delete-student.command'
import { StudentRepository } from '@modules/student/database/student.repository'
import { StudentRepositoryPort } from '@modules/student/database/student.repository.port'

@CommandHandler(DeleteStudentCommand)
export class DeleteStudentService {
  /**
   * constructor
   * @param {StudentRepository} studentRepository
   */
  constructor(
    @Inject(StudentRepository)
    private readonly studentRepository: StudentRepositoryPort,
  ) {}

  /**
   *
   * @param {DeleteStudentCommand} command
   */
  async execute(command: DeleteStudentCommand): Promise<void> {
    const found = await this.studentRepository.findOneByIdOrThrow(
      command.studentId,
    )
    await this.studentRepository.delete(found)
  }
}
