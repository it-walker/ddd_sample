import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object'
import {
  EntityProps,
  OrmEntityProps,
  OrmMapper,
} from '@libs/ddd/infrastructure/database/base-classes/orm-mapper.base'
import { StudentOrmEntity } from '@modules/student/database/student.orm-entity'
import {
  StudentEntity,
  StudentProps,
} from '@modules/student/domain/entities/student.entity'
import { StudentName } from '@modules/student/domain/value-objects/student.name.value-object'

export class StudentOrmMapper extends OrmMapper<
  StudentEntity,
  StudentOrmEntity
> {
  /**
   *
   * @param {StudentEntity} entity
   * @return {OrmEntityProps<StudentOrmEntity>}
   */
  protected toOrmProps(
    entity: StudentEntity,
  ): OrmEntityProps<StudentOrmEntity> {
    const props = entity.getPropsCopy()

    const ormProps: OrmEntityProps<StudentOrmEntity> = {
      name: props.name.value,
    }
    return ormProps
  }

  /**
   *
   * @param {StudentOrmEntity} ormEntity
   * @return {EntityProps<StudentProps>}
   */
  protected toDomainProps(
    ormEntity: StudentOrmEntity,
  ): EntityProps<StudentProps> {
    const id = new UUID(ormEntity.id)
    const props: StudentProps = {
      name: new StudentName(ormEntity.name),
    }
    return { id, props }
  }
}
