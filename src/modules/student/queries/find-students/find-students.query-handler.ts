import { QueryHandlerBase } from '@libs/ddd/domain/base-classes/query-handler.base'
import { Result } from '@libs/ddd/domain/utils/result.util'
import { StudentRepository } from '@modules/student/database/student.repository'
import { StudentEntity } from '@modules/student/domain/entities/student.entity'
import { FindStudentsQuery } from '@modules/student/queries/find-students/find-students.query'
import { QueryHandler } from '@nestjs/cqrs'

@QueryHandler(FindStudentsQuery)
export class FindStudentsQueryHandler extends QueryHandlerBase {
  /**
   * constructor
   * @param {StudentRepository} studentRepository
   */
  constructor(private readonly studentRepository: StudentRepository) {
    super()
  }

  /**
   * Since this is a simple query with no additional business
   * logic involved, it bypasses application's core completely
   * and retrieves users directly from a repository.
   * @param {FindStudentsQuery} query
   * @return {Promise<Result<StudentEntity[]>>}
   */
  async handle(query: FindStudentsQuery): Promise<Result<StudentEntity[]>> {
    const students = await this.studentRepository.findStudents(query)
    return Result.ok(students)
  }
}
