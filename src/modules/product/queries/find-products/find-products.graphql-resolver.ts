import { Args, Query, Resolver } from '@nestjs/graphql'

import { ProductRepository } from '@modules/product/database/product.repository'
import { ProductResponse } from '@modules/product/dtos/product.response.dto'
import { FindProductsQuery } from '@modules/product/queries/find-products/find-products.query'
import { FindProductsRequest } from '@modules/product/queries/find-products/find-products.request.dto'

@Resolver()
/**
 * FindProductsGraphqlResolver class
 */
export class FindProductsGraphqlResolver {
  /**
   * constructor
   * @param {ProductRepository} productRepo
   */
  constructor(private readonly productRepo: ProductRepository) { }

  @Query(() => [ProductResponse])
  /**
   *
   */
  async findProducts(
    @Args('input') input: FindProductsRequest,
  ): Promise<ProductResponse[]> {
    const query = new FindProductsQuery(input)
    const products = await this.productRepo.findProducts(query)

    return products.map((product) => new ProductResponse(product))
  }
}
