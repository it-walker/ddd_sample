import { Field, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'

import { ResponseBase } from '@libs/ddd/interface-adapters/base-classes/response.base'

import { ClubEntity } from '@modules/club/domain/entities/club.entity'

import { Club } from '@src/interface-adapters/interfaces/club/club.interface'

@ObjectType()
export class ClubResponse extends ResponseBase implements Club {
  /**
   * constructor
   * @param {ClubEntity} club
   */
  constructor(club: ClubEntity) {
    super(club)
    const props = club.getPropsCopy()
    this.name = props.name.value
    this.isApproval = props.isApproval
  }

  @ApiProperty({
    example: 'baseball',
    description: 'Club\'s name',
  })
  @Field()
  name: string;

  @ApiProperty({
    example: 'true',
    description: 'Club\'s approval status',
  })
  @Field()
  isApproval: boolean;
}

export class ClubHttpResponse extends ClubResponse implements Club { }
