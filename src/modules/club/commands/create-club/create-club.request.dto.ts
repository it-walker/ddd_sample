import { ArgsType, Field, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import {
  IsArray,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'

import { CreateClub } from '@src/interface-adapters/interfaces/club/create.club.interface'

@ArgsType() // <- only if you are using GraphQL
@InputType() // <- only if you are using GraphQL
export class CreateClubRequest implements CreateClub {
  @ApiProperty({
    example: 'baseball',
    description: 'club name',
  })
  @MaxLength(320)
  @MinLength(5)
  @Field() // <- only if you are using graphql
  readonly name: string;

  @ApiProperty({ example: 'Approval', description: '承認状態' })
  @IsOptional()
  @Field() // <- only if you are using graphql
  readonly isApproval: boolean;

  @ApiProperty({ example: 'uuid', description: '部員の生徒ID' })
  @IsArray()
  // @Field()
  readonly memberIds: string[];
}

export class CreateClubHttpRequest extends CreateClubRequest
  implements CreateClub {}

export class CreateClubMessageRequest extends CreateClubRequest
  implements CreateClub {}
