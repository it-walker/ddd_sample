import { ApiProperty } from '@nestjs/swagger'

import { BaseEntityProps } from '@libs/ddd/domain/base-classes/entity.base'
import { IdResponse } from '@libs/ddd/interface-adapters/dtos/id.response.dto'

/**
 * ResponseBaseクラス
 */
export class ResponseBase extends IdResponse {
  /**
   * コンストラクタ
   * @param { BaseEntityProps } entity
   */
  constructor(entity: BaseEntityProps) {
    super(entity.id.value)
    this.createdAt = entity.createdAt.value.toISOString()
    this.updatedAt = entity.updatedAt.value.toISOString()
  }

  @ApiProperty({ example: '2020-11-24T17:43:15.970Z' })
  createdAt: string;

  @ApiProperty({ example: '2020-11-24T17:43:15.970Z' })
  updatedAt: string;
}
