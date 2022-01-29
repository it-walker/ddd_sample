import { Field, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'

import { ResponseBase } from '@libs/ddd/interface-adapters/base-classes/response.base'

import { StudentEntity } from '@modules/student/domain/entities/student.entity'

import { Student } from '@src/interface-adapters/interfaces/student/student.interface'

@ObjectType() // only if you are using graphql
export class StudentResponse extends ResponseBase implements Student {
  /**
   * constructor
   * @param {StudentEntity} student
   */
  constructor(student: StudentEntity) {
    super(student)
    const props = student.getPropsCopy()
    this.name = props.name.value
  }

  @ApiProperty({
    example: 'joh',
    description: 'Student\'s name',
  })
  @Field()
  name: string;
}

export class StudentHttpResponse extends StudentResponse implements Student {}
