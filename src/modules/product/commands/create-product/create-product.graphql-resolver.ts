import { CommandBus } from '@nestjs/cqrs'
import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { CreateProductCommand } from '@modules/product/commands/create-product/create-product.command'
import { CreateProductRequest } from '@modules/product/commands/create-product/create-product.request.dto'

import { IdResponse } from '@src/libs/ddd/interface-adapters/dtos/id.response.dto'

@Resolver()
/**
 * CreateProductGraphqlResolver class
 */
export class CreateProductGraphqlResolver {
  /**
   * constructor
   * @param {CommandBus} commandBus
   */
  constructor(private readonly commandBus: CommandBus) { }

  @Mutation(() => IdResponse)
  /**
   *
   * @param {CreateProductRequest} input
   * @return {Promise<IdResponse>}
   */
  async create(
    @Args('input') input: CreateProductRequest,
  ): Promise<IdResponse> {
    const command = new CreateProductCommand(input)

    const id = await this.commandBus.execute(command)

    return new IdResponse(id.unwrap().value)
  }
}
