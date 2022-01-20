import { ArgsType, Field, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, MaxLength } from 'class-validator'

import { FindProducts } from '@src/interface-adapters/interfaces/product/find-products.interface'

@ArgsType() // <- only if you are using GraphQL
@InputType()
/**
 * FindProductsRequest class
 */
export class FindProductsRequest implements FindProducts {
  @ApiProperty({ example: 'Product', description: '商品名' })
  @MaxLength(50)
  @IsOptional()
  @IsString()
  @Field({ nullable: true }) // <- only if you are using GraphQL
  readonly name: string;
}

/**
 * FindProductsHttpRequest class
 */
export class FindProductsHttpRequest
  extends FindProductsRequest
  implements FindProducts {}
