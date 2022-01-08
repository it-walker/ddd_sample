import { Inject } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Logger } from '@src/libs/ddd/domain/ports/logger.port';
import { Command, Console } from 'nestjs-console';
import { createProductCliLoggerSymbol } from '../../product.provider';
import { CreateProductCommand } from './create-product.command';

@Console({
  command: 'new',
  description: 'A command to create a product',
})
export class CreateProductCliController {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(createProductCliLoggerSymbol)
    private readonly logger: Logger,
  ) {}

  @Command({
    command: 'product <name>',
    description: 'Create a product',
  })
  async createProduct(
    name: string,
    description: string,
    price: number,
  ): Promise<void> {
    const command = new CreateProductCommand({
      name,
      description,
      price,
    });

    const id = await this.commandBus.execute(command);

    this.logger.log(`Product created: ${id.unwrap().value}`);
  }
}
