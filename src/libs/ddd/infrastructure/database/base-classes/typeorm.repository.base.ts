import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base'
import { DomainEvents } from '@libs/ddd/domain/domain-events'
import { Logger } from '@libs/ddd/domain/ports/logger.port'
import {
  DataWithPaginationMeta,
  FindManyPaginatedParams,
  QueryParams,
  RepositoryPort,
} from '@libs/ddd/domain/ports/repository.ports'
import { ID } from '@libs/ddd/domain/value-objects/id.value-object'
import { OrmMapper } from '@libs/ddd/infrastructure/database/base-classes/orm-mapper.base'
import { NotFoundException } from '@libs/exceptions'
import { FindConditions, ObjectLiteral, Repository } from 'typeorm'

export type WhereCondition<OrmEntity> =
  | FindConditions<OrmEntity>[]
  | FindConditions<OrmEntity>
  | ObjectLiteral
  | string

/**
 * TypeormRepositoryBase class
 */
export abstract class TypeormRepositoryBase<
  Entity extends AggregateRoot<unknown>,
  EntityProps,
  OrmEntity,
  > implements RepositoryPort<Entity, EntityProps>
{
  /**
   * constructor
   * @param {Repository<OrmEntity>} repository
   * @param {OrmMapper<Entity, OrmEntity>} mapper
   * @param {Logger} logger
   */
  protected constructor(
    protected readonly repository: Repository<OrmEntity>,
    protected readonly mapper: OrmMapper<Entity, OrmEntity>,
    protected readonly logger: Logger,
  ) { }

  protected abstract relations: string[];

  protected tableName = this.repository.metadata.tableName;

  protected abstract prepareQuery(
    params: QueryParams<EntityProps>,
  ): WhereCondition<OrmEntity>;

  /**
   *
   * @param {Entity} entity
   * @return {Promise<Entity>}
   */
  async save(entity: Entity): Promise<Entity> {
    entity.validate() // Protecting invariant before saving
    const ormEntity = this.mapper.toOrmEntity(entity)
    const result = await this.repository.save(ormEntity)
    await DomainEvents.publishEvents(
      entity.id,
      this.logger,
      this.correlationId,
    )
    this.logger.debug(
      `[${entity.constructor.name}] persisted ${entity.id.value}`,
    )
    return this.mapper.toDomainEntity(result)
  }

  /**
   *
   * @param {Entity[]} entities
   * @return {Promise<Entity[]>}
   */
  async saveMultiple(entities: Entity[]): Promise<Entity[]> {
    const ormEntities = entities.map((entity) => {
      entity.validate()
      return this.mapper.toOrmEntity(entity)
    })
    const result = await this.repository.save(ormEntities)
    await Promise.all(
      entities.map((entity) =>
        DomainEvents.publishEvents(entity.id, this.logger, this.correlationId),
      ),
    )
    this.logger.debug(
      `[${entities}]: persisted ${entities.map((entity) => entity.id)}`,
    )
    return result.map((entity) => this.mapper.toDomainEntity(entity))
  }

  /**
   *
   * @param {QueryParams<EntityProps>} params
   * @return {Promise<Entity | undefined>}
   */
  async findOne(
    params: QueryParams<EntityProps> = {},
  ): Promise<Entity | undefined> {
    const where = this.prepareQuery(params)
    const found = await this.repository.findOne({
      where,
      relations: this.relations,
    })
    return found ? this.mapper.toDomainEntity(found) : undefined
  }

  /**
   *
   * @param {QueryParams<EntityProps>} params
   * @return {Promise<Entity>}
   */
  async findOneOrThrow(params: QueryParams<EntityProps> = {}): Promise<Entity> {
    const found = await this.findOne(params)
    if (!found) {
      throw new NotFoundException()
    }
    return found
  }

  /**
   *
   * @param {ID | string} id
   * @return {Promise<Entity>}
   */
  async findOneByIdOrThrow(id: ID | string): Promise<Entity> {
    const found = await this.repository.findOne({
      where: { id: id instanceof ID ? id.value : id },
    })
    if (!found) {
      throw new NotFoundException()
    }
    return this.mapper.toDomainEntity(found)
  }

  /**
   *
   * @param {QueryParams<EntityProps>} params
   * @return {Promise<Entity[]>}
   */
  async findMany(params: QueryParams<EntityProps> = {}): Promise<Entity[]> {
    const result = await this.repository.find({
      where: this.prepareQuery(params),
      relations: this.relations,
    })

    return result.map((item) => this.mapper.toDomainEntity(item))
  }

  /**
   *
   * @param {FindManyPaginatedParams<EntityProps>} param0
   * @return {Promise<DataWithPaginationMeta<Entity[]>>}
   */
  async findManyPaginated({
    params = {},
    pagination,
    orderBy,
  }: FindManyPaginatedParams<EntityProps>): Promise<
    DataWithPaginationMeta<Entity[]>
  > {
    const [data, count] = await this.repository.findAndCount({
      skip: pagination?.skip,
      take: pagination?.limit,
      where: this.prepareQuery(params),
      order: orderBy,
      relations: this.relations,
    })

    const result: DataWithPaginationMeta<Entity[]> = {
      data: data.map((item) => this.mapper.toDomainEntity(item)),
      count,
      limit: pagination?.limit,
      page: pagination?.page,
    }

    return result
  }

  /**
   *
   * @param {Entity} entity
   * @return {Promise<Entity>}
   */
  async delete(entity: Entity): Promise<Entity> {
    entity.validate()
    await this.repository.remove(this.mapper.toOrmEntity(entity))
    await DomainEvents.publishEvents(
      entity.id,
      this.logger,
      this.correlationId,
    )
    this.logger.debug(
      `[${entity.constructor.name}] deleted ${entity.id.value}`,
    )
    return entity
  }

  protected correlationId?: string;

  /**
   *
   * @param {string} correlationId
   * @return {this}
   */
  setCorrelationId(correlationId: string): this {
    this.correlationId = correlationId
    this.setContext()
    return this
  }

  /**
   *
   */
  private setContext() {
    if (this.correlationId) {
      this.logger.setContext(`${this.constructor.name}:${this.correlationId}`)
    } else {
      this.logger.setContext(this.constructor.name)
    }
  }
}
