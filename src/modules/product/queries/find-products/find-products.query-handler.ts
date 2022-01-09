import {Result} from '@libs/ddd/domain/utils/result.util';
import {QueryHandler} from '@nestjs/cqrs';
import {QueryHandlerBase} from '@src/libs/ddd/domain/base-classes/query-handler.base';

import {ProductRepository} from '../../database/product.repository';
import {ProductEntity} from '../../domain/entities/product.entity';
import {FindProductsQuery} from './find-products.query';

@QueryHandler(FindProductsQuery)
export class FindProductsQueryHandler extends QueryHandlerBase {
  constructor(private readonly productRepo: ProductRepository) {
    super();
  }

  /* Since this is a simple query with no additional business
     logic involved, it bypasses application's core completely
     and retrieves users directly from a repository.
   */
  async handle(query: FindProductsQuery): Promise<Result<ProductEntity[]>> {
    const users = await this.productRepo.findProducts(query);
    return Result.ok(users);
  }
}
