import { ArgsType, Field, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { FindClubs } from '@src/interface-adapters/interfaces/club/find-clubs.interface'
import {
  IsAlphanumeric,
  IsBoolean,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator'

@ArgsType()
@InputType()
export class FindClubsRequest implements FindClubs {
  @ApiProperty({ example: 'baseball', description: 'Club name' })
  @MaxLength(50)
  @IsString()
  @Matches(/^[a-zA-Z ]*$/)
  @Field({ nullable: true })
  readonly name: string;

  @ApiProperty({ example: 'true', description: 'is approval status' })
  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true })
  readonly isApproval: boolean;
}

/**
 * FindClubsHttpRequest class
 */
export class FindClubsHttpRequest
  extends FindClubsRequest
  implements FindClubs { }
