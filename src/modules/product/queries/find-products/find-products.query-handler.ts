import { QueryHandler } from '@nestjs/cqrs'

import { Result } from '@libs/ddd/domain/utils/result.util'

import { ProductRepository } from '@modules/product/database/product.repository'
import { ProductEntity } from '@modules/product/domain/entities/product.entity'
import { FindProductsQuery } from '@modules/product/queries/find-products/find-products.query'

import { QueryHandlerBase } from '@src/libs/ddd/domain/base-classes/query-handler.base'

@QueryHandler(FindProductsQuery)
/**
 * FindProductsQueryHandler
 */
export class FindProductsQueryHandler extends QueryHandlerBase {
  /**
   * constructor
   * @param {ProductResponse} productRepo
   */
  constructor(private readonly productRepo: ProductRepository) {
    super()
  }

  /**
   * Since this is a simple query with no additional business
   * logic involved, it bypasses application's core completely
   * and retrieves users directly from a repository.
   * @param {FindProductsQuery} query
   * @return {Promise<Result<ProductEntity[]>>}
   */
  async handle(query: FindProductsQuery): Promise<Result<ProductEntity[]>> {
    const users = await this.productRepo.findProducts(query)
    return Result.ok(users)
  }
}
