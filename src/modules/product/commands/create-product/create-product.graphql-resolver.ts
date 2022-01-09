import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { IdResponse } from '@src/libs/ddd/interface-adapters/dtos/id.response.dto';

import { CreateProductCommand } from './create-product.command';
import { CreateProductRequest } from './create-product.request.dto';

@Resolver()
export class CreateProductGraphqlResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => IdResponse)
  async create(
    @Args('input') input: CreateProductRequest,
  ): Promise<IdResponse> {
    const command = new CreateProductCommand(input);

    const id = await this.commandBus.execute(command);

    return new IdResponse(id.unwrap().value);
  }
}
