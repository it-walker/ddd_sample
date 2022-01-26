import { DeleteProductCommand } from '@modules/product/commands/delete-product/delete-product.commands'
import { ProductRepository } from '@modules/product/database/product.repository'
import { ProductRepositoryPort } from '@modules/product/database/product.repository.port'
import { Inject } from '@nestjs/common'
import { CommandHandler } from '@nestjs/cqrs'

@CommandHandler(DeleteProductCommand)
/**
 * DeleteProductService class
 */
export class DeleteProductService {
  /**
   * constructor
   * @param {ProductRepository} productRepo
   */
  constructor(
    @Inject(ProductRepository)
    private readonly productRepo: ProductRepositoryPort,
  ) { }

  /**
   *
   * @param {DeleteProductCommand} command
   */
  async execute(command: DeleteProductCommand): Promise<void> {
    const found = await this.productRepo.findOneByIdOrThrow(command.productId)
    await this.productRepo.delete(found)
  }
}
