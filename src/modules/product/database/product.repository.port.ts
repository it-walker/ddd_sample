import { ProductEntity, ProductProps } from '@modules/product/domain/entities/product.entity'

import { RepositoryPort } from '@src/libs/ddd/domain/ports/repository.ports'

export interface ProductRepositoryPort
  extends RepositoryPort<ProductEntity, ProductProps> {
  findOneByIdOrThrow(id: string): Promise<ProductEntity>;
  findOneByProductNameOrThrow(name: string): Promise<ProductEntity>;
  exists(name: string): Promise<boolean>;
}
