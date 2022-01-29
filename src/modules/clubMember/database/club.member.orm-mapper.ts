import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object'
import {
  EntityProps,
  OrmEntityProps,
  OrmMapper,
} from '@libs/ddd/infrastructure/database/base-classes/orm-mapper.base'

import { ClubMemberOrmEntity } from '@modules/clubMember/database/club.member.orm-entity'
import {
  ClubMemberEntity,
  ClubMemberProps,
} from '@modules/clubMember/domain/entities/club.member.entity'

export class ClubMemberOrmMapper extends OrmMapper<
  ClubMemberEntity,
  ClubMemberOrmEntity
> {
  /**
   *
   * @param {ClubMemberEntity}entity
   * @return {OrmEntityProps<ClubMemberOrmEntity>}
   */
  protected toOrmProps(
    entity: ClubMemberEntity,
  ): OrmEntityProps<ClubMemberOrmEntity> {
    const props = entity.getPropsCopy()

    const ormProps: OrmEntityProps<ClubMemberOrmEntity> = {
      clubId: props.clubId.value,
      studentId: props.studentId.value,
    }
    return ormProps
  }

  /**
   *
   * @param {ClubMemberOrmEntity} ormEntity
   * @return {EntityProps<ClubMemberProps>}
   */
  protected toDomainProps(
    ormEntity: ClubMemberOrmEntity,
  ): EntityProps<ClubMemberProps> {
    const id = new UUID(ormEntity.id)
    const props: ClubMemberProps = {
      clubId: new UUID(ormEntity.clubId),
      studentId: new UUID(ormEntity.studentId),
    }
    return { id, props }
  }
}
