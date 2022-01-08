import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, MinLength } from 'class-validator';
import { CreateProduct } from '@src/interface-adapters/interfaces/product/create.product.interface';

@ArgsType() // <- only if you are using GraphQL
@InputType() // <- only if you are using GraphQL
export class CreateProductRequest implements CreateProduct {
  @ApiProperty({
    example: 'product A',
    description: '商品の名称',
  })
  @MaxLength(200)
  @MinLength(5)
  @Field()
  readonly name: string;
}

export class CreateProductHttpRequest
  extends CreateProductRequest
  implements CreateProduct {}

export class CreateProductMessageRequest
  extends CreateProductRequest
  implements CreateProduct {}
