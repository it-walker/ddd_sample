import { Args, Query, Resolver } from '@nestjs/graphql'

import { StudentRepository } from '@modules/student/database/student.repository'
import { StudentResponse } from '@modules/student/dtos/student.response.dto'
import { FindStudentsQuery } from '@modules/student/queries/find-students/find-students.query'
import { FindStudentsRequest } from '@modules/student/queries/find-students/find-students.request.dto'

@Resolver()
export class FindStudentsGraphqlResolver {
  /**
   * constructor
   * @param {StudentRepository} studentRepository
   */
  constructor(private readonly studentRepository: StudentRepository) {}

  @Query(() => [StudentResponse])
  /**
   *
   */
  async findStudents(
    @Args('input') input: FindStudentsRequest,
  ): Promise<StudentResponse[]> {
    const query = new FindStudentsQuery(input)
    const students = await this.studentRepository.findStudents(query)

    return students.map((student) => new StudentResponse(student))
  }
}
