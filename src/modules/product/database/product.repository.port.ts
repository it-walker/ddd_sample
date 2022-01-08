import { RepositoryPort } from '@src/libs/ddd/domain/ports/repository.ports';
import { ProductEntity, ProductProps } from '../domain/entities/product.entity';

export interface ProductRepositoryPort
  extends RepositoryPort<ProductEntity, ProductProps> {
  findOneByIdOrThrow(id: string): Promise<ProductEntity>;
  findOneByEmailOrThrow(email: string): Promise<ProductEntity>;
  exists(email: string): Promise<boolean>;
}
