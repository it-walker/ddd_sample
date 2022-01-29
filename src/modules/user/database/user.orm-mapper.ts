import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object'
import {
  EntityProps,
  OrmEntityProps,
  OrmMapper,
} from '@libs/ddd/infrastructure/database/base-classes/orm-mapper.base'

import { UserOrmEntity } from '@modules/user/database/user.orm-entity'
import {
  UserEntity,
  UserProps,
} from '@modules/user/domain/entities/user.entity'
import { Address } from '@modules/user/domain/value-objects/address.value-object'
import { Email } from '@modules/user/domain/value-objects/email.value-object'

export class UserOrmMapper extends OrmMapper<UserEntity, UserOrmEntity> {
  /**
   *
   * @param {UserEntity} entity
   * @return {OrmEntityProps<UserOrmEntity>}
   */
  protected toOrmProps(entity: UserEntity): OrmEntityProps<UserOrmEntity> {
    const props = entity.getPropsCopy()

    const ormProps: OrmEntityProps<UserOrmEntity> = {
      email: props.email.value,
      country: props.address.country,
      postalCode: props.address.postalCode,
      street: props.address.street,
      role: props.role,
    }
    return ormProps
  }

  /**
   *
   * @param {UserOrmEntity} ormEntity
   * @return {EntityProps<UserProps>}
   */
  protected toDomainProps(ormEntity: UserOrmEntity): EntityProps<UserProps> {
    const id = new UUID(ormEntity.id)
    const props: UserProps = {
      email: new Email(ormEntity.email),
      role: ormEntity.role,
      address: new Address({
        street: ormEntity.street,
        postalCode: ormEntity.postalCode,
        country: ormEntity.country,
      }),
    }
    return { id, props }
  }
}
