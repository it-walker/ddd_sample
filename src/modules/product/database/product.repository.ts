import {Injectable, Logger, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {QueryParams} from '@src/libs/ddd/domain/ports/repository.ports';
import {
  TypeormRepositoryBase,
  WhereCondition,
} from '@src/libs/ddd/infrastructure/database/base-classes/typeorm.repository.base';
import {removeUndefinedProps} from '@src/libs/utils/remove-undefined-props.util';
import {
  ProductEntity,
  ProductProps,
} from '@src/modules/product/domain/entities/product.entity';
import {Repository} from 'typeorm';

import {FindProductsQuery} from '../queries/find-products/find-products.query';
import {ProductOrmMapper} from './product.orm.mapper';
import {ProductOrmEntity} from './product.orm-entity';
import {ProductRepositoryPort} from './product.repository.port';

@Injectable()
export class ProductRepository
  extends TypeormRepositoryBase<ProductEntity, ProductProps, ProductOrmEntity>
  implements ProductRepositoryPort {
  protected relations: string[] = [];

  constructor(
    @InjectRepository(ProductOrmEntity)
    private readonly productRepository: Repository<ProductOrmEntity>,
  ) {
    super(
        productRepository,
        new ProductOrmMapper(ProductEntity, ProductOrmEntity),
        new Logger('ProductRepository'),
    );
  }

  private async findOneById(id: string): Promise<ProductOrmEntity | undefined> {
    const product = await this.productRepository.findOne({
      where: {id},
    });

    return product;
  }

  async findOneByIdOrThrow(id: string): Promise<ProductEntity> {
    const product = await this.findOneById(id);
    if (!product) {
      throw new NotFoundException(`Product with id '${id}' not found`);
    }
    return this.mapper.toDomainEntity(product);
  }

  private async findOneByProductName(
      name: string,
  ): Promise<ProductOrmEntity | undefined> {
    const user = await this.productRepository.findOne({
      where: {name: name},
    });

    return user;
  }

  async findOneByProductNameOrThrow(name: string): Promise<ProductEntity> {
    const product = await this.findOneByProductName(name);
    if (!product) {
      throw new NotFoundException(`Product with name '${name}' not found`);
    }
    return this.mapper.toDomainEntity(product);
  }

  async exists(name: string): Promise<boolean> {
    const found = await this.findOneByProductName(name);
    if (found) {
      return true;
    }
    return false;
  }

  async findProducts(query: FindProductsQuery): Promise<ProductEntity[]> {
    const where: QueryParams<ProductOrmEntity> = removeUndefinedProps(query);
    const products = await this.repository.find({where});
    return products.map((product) => this.mapper.toDomainEntity(product));
  }

  // Used to construct a query
  protected prepareQuery(
      params: QueryParams<ProductProps>,
  ): WhereCondition<ProductOrmEntity> {
    const where: QueryParams<ProductOrmEntity> = {};
    if (params.id) {
      where.id = params.id.value;
    }
    if (params.createdAt) {
      where.createdAt = params.createdAt.value;
    }
    return where;
  }
}
