import { ArgsType, Field, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { CreateStudent } from '@src/interface-adapters/interfaces/student/create.student.interface'
import { MaxLength, MinLength } from 'class-validator'

@ArgsType() // <- only if you are using GraphQL
@InputType() // <- only if you are using GraphQL
export class CreateStudentRequest implements CreateStudent {
  @ApiProperty({
    example: 'john',
    description: 'Student name',
  })
  @MaxLength(320)
  @MinLength(5)
  @Field() // <- only if you are using graphql
  readonly name: string;
}

export class CreateStudentHttpRequest extends CreateStudentRequest
  implements CreateStudent {}

export class CreateStudentMessageRequest extends CreateStudentRequest
  implements CreateStudent {}
