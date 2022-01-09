import { Args, Query, Resolver } from '@nestjs/graphql';

import { ProductRepository } from '../../database/product.repository';
import { ProductResponse } from '../../dtos/product.response.dto';
import { FindProductsQuery } from './find-products.query';
import { FindProductsRequest } from './find-products.request.dto';

@Resolver()
/**
 * FindProductsGraphqlResolver class
 */
export class FindProductsGraphqlResolver {
  /**
   * constructor
   * @param {ProductRepository} productRepo
   */
  constructor(private readonly productRepo: ProductRepository) {}

  @Query(() => [ProductResponse])
  /**
   *
   */
  async findProducts(
    @Args('input') input: FindProductsRequest,
  ): Promise<ProductResponse[]> {
    const query = new FindProductsQuery(input);
    const products = await this.productRepo.findProducts(query);

    return products.map((product) => new ProductResponse(product));
  }
}
