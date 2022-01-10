import { UUID } from '@src/libs/ddd/domain/value-objects/uuid.value-object';
import {
  EntityProps,
  OrmEntityProps,
  OrmMapper,
} from '@src/libs/ddd/infrastructure/database/base-classes/orm-mapper.base';
import { TaskOrmEntity } from './task.orm-entity';

/**
 * TaskOrmMapper class
 */
export class TaskOrmMapper extends OrmMapper<TaskOrmEntity, TaskOrmEntity> {
  /**
   *
   * @param {TaskOrmEntity} entity
   * @return {OrmEntityProps<TaskOrmEntity>}
   */
  protected toOrmProps(entity: TaskOrmEntity): OrmEntityProps<TaskOrmEntity> {
    const props = entity.getPropsCopy();

    const ormProps: OrmEntityProps<TaskOrmEntity> = {
      name: props.name.value,
      dueDate: props.dueDate.value,
      postponeCount: props.postponeCount.value,
      status: props.status,
    };
    return ormProps;
  }

  /**
   *
   * @param {TaskOrmEntity} ormEntity
   * @return {EntityProps<TaskProps>}
   */
  protected toDomainProps(ormEntity: TaskOrmEntity): EntityProps<TaskProps> {
    const id = new UUID(ormEntity.id);
    const props: TaskProps = {
      name: new TaskName(ormEntity.name),
      status: ormEntity.status,
      postponeCount: ormEntity.postponeCount,
      dueDate: ormEntity.dueDate,
    };
    return { id, props };
  }
}
