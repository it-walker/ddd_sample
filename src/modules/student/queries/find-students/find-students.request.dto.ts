import { ArgsType, Field, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import {
  IsAlphanumeric,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator'

import { FindStudents } from '@src/interface-adapters/interfaces/student/find-students.interface'

@ArgsType() // <- only if you are using GraphQL
@InputType()
/**
 * FindStudentsRequest class
 */
export class FindStudentsRequest implements FindStudents {
  @ApiProperty({ example: 'Joh', description: 'Student name' })
  @MaxLength(50)
  @IsOptional()
  @IsString()
  @Field({ nullable: true }) // <- only if you are using GraphQL
  readonly name: string;
}

export class FindStudentsHttpRequest extends FindStudentsRequest
  implements FindStudents {}
