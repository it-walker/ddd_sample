import { routesV1 } from '@config/app.routes';
import { Body, Controller, Get, HttpStatus } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Result } from '@src/libs/ddd/domain/utils/result.util';

import { ProductEntity } from '../../domain/entities/product.entity';
import { ProductHttpResponse } from '../../dtos/product.response.dto';
import { FindProductsQuery } from './find-products.query';
import { FindProductsHttpRequest } from './find-products.request.dto';

@Controller(routesV1.version)
export class FindProductsHttpController {
  constructor(private readonly queryBys: QueryBus) {}

  @Get(routesV1.product.root)
  @ApiOperation({ summary: 'Find products' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProductHttpResponse,
  })
  async findProducts(
    @Body() request: FindProductsHttpRequest,
  ): Promise<ProductHttpResponse[]> {
    const query = new FindProductsQuery(request);
    const result: Result<ProductEntity[]> = await this.queryBys.execute(query);

    /* Returning Response classes which are responsible
       for whitelisting data that is sent to the user */
    return result.unwrap().map((product) => {
      return new ProductHttpResponse(product);
    });
  }
}
