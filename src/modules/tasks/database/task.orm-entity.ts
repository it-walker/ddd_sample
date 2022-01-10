import { TypeormEntityBase } from '@src/libs/ddd/infrastructure/database/base-classes/typeorm.entity.base';
import { Column } from 'typeorm';

/**
 * TaskOrmEntity class
 */
export class TaskOrmEntity extends TypeormEntityBase {
  /**
   * constructor
   * @param {TaskOrmEntity} props
   */
  constructor(props?: TaskOrmEntity) {
    super(props);
  }

  @Column()
  name: string;

  @Column()
  dueDate: Date;

  @Column()
  postponeCount: number;

  @Column()
  status: TaskStatusType;
}
