import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object'
import {
  EntityProps,
  OrmEntityProps,
  OrmMapper,
} from '@libs/ddd/infrastructure/database/base-classes/orm-mapper.base'

import { ClubOrmEntity } from '@modules/club/database/club.orm-entity'
import {
  ClubEntity,
  ClubProps,
} from '@modules/club/domain/entities/club.entity'
import { ClubName } from '@modules/club/domain/value-objects/club.name.value-object'

export class ClubOrmMapper extends OrmMapper<ClubEntity, ClubOrmEntity> {
  /**
   *
   * @param {ClubEntity} entity
   * @return {OrmEntityProps<ClubOrmEntity>}
   */
  protected toOrmProps(entity: ClubEntity): OrmEntityProps<ClubOrmEntity> {
    const props = entity.getPropsCopy()

    const ormProps: OrmEntityProps<ClubOrmEntity> = {
      name: props.name.value,
      isApproval: props.isApproval,
      memberIds: props.memberIds,
      // members: props.members.map((e) => {
      //   return new ClubMemberOrmEntity();
      // }),
    }

    return ormProps
  }

  /**
   *
   * @param {ClubOrmEntity} ormEntity
   * @return {EntityProps<ClubProps>}
   */
  protected toDomainProps(ormEntity: ClubOrmEntity): EntityProps<ClubProps> {
    const id = new UUID(ormEntity.id)
    const props: ClubProps = {
      name: new ClubName(ormEntity.name),
      isApproval: ormEntity.isApproval,
      memberIds: ormEntity.memberIds,
    }
    return { id, props }
  }
}
