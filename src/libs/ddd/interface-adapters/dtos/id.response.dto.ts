import { Field, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'

import { Id } from '@libs/ddd/interface-adapters/interfaces/id.interface'

@ObjectType() // <- only if you are using GraphQL
/**
 * IdResponseクラス
 */
export class IdResponse implements Id {
  /**
   * コンストラクタ
   * @param {string} id - ID
   */
  constructor(id: string) {
    this.id = id
  }

  @ApiProperty({ example: '2cdc8ab1-6d50-49cc-ba14-54e4ac7ec231' })
  @Field() // <- only if you are using GraphQL
  id: string;
}
