import {
  Body,
  ConflictException,
  Controller,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { routesV1 } from '@src/infrastructure/configs/app.routes';
import { Result } from '@src/libs/ddd/domain/utils/result.util';
import { ID } from '@src/libs/ddd/domain/value-objects/id.value-object';
import { IdResponse } from '@src/libs/ddd/interface-adapters/dtos/id.response.dto';
import { ProductAlreadyExistsError } from '@src/modules/product/errors/product.error';

import { CreateProductCommand } from './create-product.command';
import { CreateProductHttpRequest } from './create-product.request.dto';

@Controller(routesV1.version)
export class CreateProductHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(routesV1.product.root)
  @ApiOperation({ summary: 'Create a product' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: ProductAlreadyExistsError.message,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
  })
  async create(@Body() body: CreateProductHttpRequest): Promise<IdResponse> {
    const command = new CreateProductCommand(body);

    const result: Result<
      ID,
      ProductAlreadyExistsError
    > = await this.commandBus.execute(command);

    return result.unwrap(
        (id) => new IdResponse(id.value),
        (error) => {
          if (error instanceof ProductAlreadyExistsError) {
            throw new ConflictException(error.message);
          }
          throw error;
        },
    );
  }
}
