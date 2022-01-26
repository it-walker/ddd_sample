import { CreateProductCommand } from '@modules/product/commands/create-product/create-product.command'
import { createProductCliLoggerSymbol } from '@modules/product/product.provider'
import { Inject } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Logger } from '@src/libs/ddd/domain/ports/logger.port'
import { Command, Console } from 'nestjs-console'

@Console({
  command: 'new',
  description: 'A command to create a product',
})
/**
 * CreateProductCliController class
 */
export class CreateProductCliController {
  /**
   *
   * @param {CommandBus} commandBus
   * @param {Logger} logger
   */
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(createProductCliLoggerSymbol)
    private readonly logger: Logger,
  ) { }

  @Command({
    command: 'product <name>',
    description: 'Create a product',
  })
  /**
   *
   * @param {string} name
   * @param {string} description
   * @param {number} practices
   * @return {Promise<void>}
   */
  async createProduct(
    name: string,
    description: string,
    price: number,
  ): Promise<void> {
    const command = new CreateProductCommand({
      name,
      description,
      price,
    })

    const id = await this.commandBus.execute(command)

    this.logger.log(`Product created: ${id.unwrap().value}`)
  }
}
