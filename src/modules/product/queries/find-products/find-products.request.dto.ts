import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { FindProducts } from '@src/interface-adapters/interfaces/product/find-products.interface';
import { IsOptional, IsString, MaxLength } from 'class-validator';

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
