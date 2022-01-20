import { Column, Entity } from 'typeorm'

import { TaskStatus } from '@modules/task/domain/entities/task.type'

import { TypeormEntityBase } from '@src/libs/ddd/infrastructure/database/base-classes/typeorm.entity.base'

@Entity('task')
/**
 * TaskOrmEntity class
 */
export class TaskOrmEntity extends TypeormEntityBase {
  /**
   * constructor
   * @param {TaskOrmEntity} props
   */
  constructor(props?: TaskOrmEntity) {
    super(props)
  }

  @Column()
  name: string;

  @Column()
  dueDate: Date;

  @Column()
  postponeCount: number;

  @Column()
  status: TaskStatus;
}
