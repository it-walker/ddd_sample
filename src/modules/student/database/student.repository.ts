import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { QueryParams } from '@libs/ddd/domain/ports/repository.ports'
import {
  TypeormRepositoryBase,
  WhereCondition,
} from '@libs/ddd/infrastructure/database/base-classes/typeorm.repository.base'
import { NotFoundException } from '@libs/exceptions'

import { StudentOrmEntity } from '@modules/student/database/student.orm-entity'
import { StudentOrmMapper } from '@modules/student/database/student.orm-mapper'
import { StudentRepositoryPort } from '@modules/student/database/student.repository.port'
import {
  StudentEntity,
  StudentProps,
} from '@modules/student/domain/entities/student.entity'
import { FindStudentsQuery } from '@modules/student/queries/find-students/find-students.query'

import { removeUndefinedProps } from '@src/libs/utils/remove-undefined-props.util'

@Injectable()
export class StudentRepository
  extends TypeormRepositoryBase<StudentEntity, StudentProps, StudentOrmEntity>
  implements StudentRepositoryPort {
  protected relations: string[] = [];

  /**
   * constructor
   * @param {StudentOrmEntity} studentRepository
   */
  constructor(
    @InjectRepository(StudentOrmEntity)
    private readonly studentRepository: Repository<StudentOrmEntity>,
  ) {
    super(
      studentRepository,
      new StudentOrmMapper(StudentEntity, StudentOrmEntity),
      new Logger('StudentRepository'),
    )
  }

  /**
   *
   * @param {string} id
   * @return {Promise<StudentOrmEntity | undefined>}
   */
  private async findOneById(id: string): Promise<StudentOrmEntity | undefined> {
    const student = await this.studentRepository.findOne({
      where: { id },
    })

    return student
  }

  /**
   *
   * @param {string} id
   * @return {Promise<StudentEntity>}
   */
  async findOneByIdOrThrow(id: string): Promise<StudentEntity> {
    const student = await this.findOneById(id)
    if (!student) {
      throw new NotFoundException(`Student with id '${id}' not found`)
    }
    return this.mapper.toDomainEntity(student)
  }

  /**
   *
   * @param {string} email
   * @return {Promise<StudentOrmEntity | undefined>}
   */
  private async findOneByName(
    name: string,
  ): Promise<StudentOrmEntity | undefined> {
    const student = await this.studentRepository.findOne({
      where: { name },
    })

    return student
  }

  /**
   *
   * @param {string} name
   * @return {Promise<UserEntity>}
   */
  async findOneByNameOrThrow(name: string): Promise<StudentEntity> {
    const student = await this.findOneByName(name)
    if (!student) {
      throw new NotFoundException(`Student with name '${name}' not found`)
    }
    return this.mapper.toDomainEntity(student)
  }

  /**
   *
   * @param {string} name
   * @return {Promise<boolean>}
   */
  async exists(name: string): Promise<boolean> {
    const found = await this.findOneByName(name)
    if (found) {
      return true
    }
    return false
  }

  /**
   *
   * @param {FindStudentsQuery} query
   * @return {Promise<StudentEntity[]>}
   */
  async findStudents(query: FindStudentsQuery): Promise<StudentEntity[]> {
    const where: QueryParams<StudentOrmEntity> = removeUndefinedProps(query)
    const students = await this.repository.find({ where })
    return students.map((student) => this.mapper.toDomainEntity(student))
  }

  /**
   *
   * @param {QueryParams<StudentProps>} params
   * @return {WhereCondition<StudentOrmEntity>}
   */
  protected prepareQuery(
    params: QueryParams<StudentProps>,
  ): WhereCondition<StudentOrmEntity> {
    const where: QueryParams<StudentOrmEntity> = {}
    if (params.id) {
      where.id = params.id.value
    }
    if (params.createdAt) {
      where.createdAt = params.createdAt.value
    }
    if (params.name) {
      where.name = params.name.value
    }
    return where
  }
}
