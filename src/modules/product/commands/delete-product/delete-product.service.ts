import { UserRepositoryPort } from '@modules/user/database/user.repository.port';
import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';

import { ProductRepository } from '../../database/product.repository';
import { ProductRepositoryPort } from '../../database/product.repository.port';
import { DeleteProductCommand } from './delete-product.commands';

@CommandHandler(DeleteProductCommand)
export class DeleteProductService {
  constructor(
    @Inject(ProductRepository)
    private readonly productRepo: ProductRepositoryPort,
  ) {}

  async execute(command: DeleteProductCommand): Promise<void> {
    const found = await this.productRepo.findOneByIdOrThrow(command.productId);
    await this.productRepo.delete(found);
  }
}
