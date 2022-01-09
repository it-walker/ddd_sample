import { UUID } from '@src/libs/ddd/domain/value-objects/uuid.value-object';
import {
  EntityProps,
  OrmEntityProps,
  OrmMapper,
} from '@src/libs/ddd/infrastructure/database/base-classes/orm-mapper.base';

import {
  MailaddressEntity,
  MailaddressProps,
} from '../domain/entities/mailaddress.entity';
import { MailaddressOrmEntity } from './mailaddress.orm-entity';

/**
 * MailaddressOrmMapper class
 */
export class MailaddressOrmMapper extends OrmMapper<
  MailaddressEntity,
  MailaddressOrmEntity
> {
  /**
   * convert to orm entity
   * @param {MailaddressEntity} entity
   * @return {OrmEntityProps<MailaddressOrmEntity>}
   */
  protected toOrmProps(
    entity: MailaddressEntity,
  ): OrmEntityProps<MailaddressOrmEntity> {
    const props = entity.getPropsCopy();

    const ormProps: OrmEntityProps<MailaddressOrmEntity> = {
      userId: props.userId.value,
      email: props.email,
    };
    return ormProps;
  }

  /**
   * convert domain property
   * @param {MailaddressOrmEntity} ormEntity
   * @return {EntityProps<MailaddressProps>}
   */
  protected toDomainProps(
    ormEntity: MailaddressOrmEntity,
  ): EntityProps<MailaddressProps> {
    const id = new UUID(ormEntity.id);
    const props: MailaddressProps = {
      userId: new UUID(ormEntity.userId),
      email: ormEntity.email,
    };
    return { id, props };
  }
}
