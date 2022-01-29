import { Body, Controller, Get, HttpStatus } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

import { ProductEntity } from '@modules/product/domain/entities/product.entity'
import { ProductHttpResponse } from '@modules/product/dtos/product.response.dto'
import { FindProductsQuery } from '@modules/product/queries/find-products/find-products.query'
import { FindProductsHttpRequest } from '@modules/product/queries/find-products/find-products.request.dto'

import { routesV1 } from '@configs/app.routes'

import { Result } from '@src/libs/ddd/domain/utils/result.util'

@Controller(routesV1.version)
/**
 * FindProductsHttpController
 */
export class FindProductsHttpController {
  /**
   *
   * @param {QueryBus} queryBys
   */
  constructor(private readonly queryBys: QueryBus) { }

  @Get(routesV1.product.root)
  @ApiOperation({ summary: 'Find products' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProductHttpResponse,
  })
  /**
   * @param {FindProductsHttpRequest} request
   * @return {Promise<ProductHttpResponse[]>}
   */
  async findProducts(
    @Body() request: FindProductsHttpRequest,
  ): Promise<ProductHttpResponse[]> {
    const query = new FindProductsQuery(request)
    const result: Result<ProductEntity[]> = await this.queryBys.execute(query)

    /* Returning Response classes which are responsible
       for whitelisting data that is sent to the user */
    return result.unwrap().map((product) => {
      return new ProductHttpResponse(product)
    })
  }
}
