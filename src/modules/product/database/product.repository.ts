import { Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryParams } from '@src/libs/ddd/domain/ports/repository.ports';
import {
  TypeormRepositoryBase,
  WhereCondition,
} from '@src/libs/ddd/infrastructure/database/base-classes/typeorm.repository.base';
import {
  ProductEntity,
  ProductProps,
} from '@src/modules/product/domain/entities/product.entity';
import { Repository } from 'typeorm';
import { ProductOrmEntity } from './product.orm-entity';
import { ProductOrmMapper } from './product.orm.mapper';
import { ProductRepositoryPort } from './product.repository.port';

export class ProductRepository
  extends TypeormRepositoryBase<ProductEntity, ProductProps, ProductOrmEntity>
  implements ProductRepositoryPort
{
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
      where: { id },
    });

    return product;
  }

  async findOneByIdOrThrow(id: string): Promise<ProductEntity> {
    const product = await this.findOneById(id);
    if (!product) {
      throw new NotFoundException(`User with id '${id}' not found`);
    }
    return this.mapper.toDomainEntity(product);
  }

  private async findOneByEmail(
    name: string,
  ): Promise<ProductOrmEntity | undefined> {
    const user = await this.productRepository.findOne({
      where: { name: name },
    });

    return user;
  }

  async findOneByEmailOrThrow(email: string): Promise<ProductEntity> {
    const product = await this.findOneByEmail(email);
    if (!product) {
      throw new NotFoundException(`User with email '${email}' not found`);
    }
    return this.mapper.toDomainEntity(product);
  }

  async exists(name: string): Promise<boolean> {
    const found = await this.findOneByEmail(name);
    if (found) {
      return true;
    }
    return false;
  }

  // async findUsers(query: FindUsersQuery): Promise<UserEntity[]> {
  //   const where: QueryParams<UserOrmEntity> = removeUndefinedProps(query);
  //   const users = await this.repository.find({ where });
  //   return users.map((user) => this.mapper.toDomainEntity(user));
  // }

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
