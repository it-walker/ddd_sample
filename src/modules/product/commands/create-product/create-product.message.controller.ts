import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern } from '@nestjs/microservices';
import { IdResponse } from '@src/libs/ddd/interface-adapters/dtos/id.response.dto';

import { CreateProductCommand } from './create-product.command';
import { CreateProductMessageRequest } from './create-product.request.dto';

@Controller()
/**
 * CreateProductMessageController class
 */
export class CreateProductMessageController {
  /**
   * constructor
   * @param {CommandBus} commandBus
   */
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern('product.create')
  /**
   *
   */
  async create(message: CreateProductMessageRequest): Promise<IdResponse> {
    const command = new CreateProductCommand(message);

    const id = await this.commandBus.execute(command);

    return new IdResponse(id.unwrap().value);
  }
}
