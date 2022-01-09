import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { CreateProduct } from '@src/interface-adapters/interfaces/product/create.product.interface';
import { MaxLength, MinLength } from 'class-validator';

@ArgsType() // <- only if you are using GraphQL
@InputType() // <- only if you are using GraphQL
/**
 * CreateProductRequest class
 */
export class CreateProductRequest implements CreateProduct {
  @ApiProperty({
    example: 'product A',
    description: '商品の名称',
  })
  @MaxLength(200)
  @MinLength(5)
  @Field()
  readonly name: string;

  @ApiProperty({
    example: 'この商品はおすすめです',
    description: '商品の説明を記載します',
  })
  @MaxLength(200)
  @MinLength(0)
  @Field()
  readonly description: string;
  @ApiProperty({
    example: '15900',
    description: '商品の値段を記載します',
  })
  @MaxLength(10)
  @MinLength(3)
  @Field()
  readonly price: number;
}

/**
 * CreateProductHttpRequest class
 */
export class CreateProductHttpRequest
  extends CreateProductRequest
  implements CreateProduct {}

/**
 * CreateProductMessageRequest class
 */
export class CreateProductMessageRequest
  extends CreateProductRequest
  implements CreateProduct {}
