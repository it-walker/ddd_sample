import { Column, Entity } from 'typeorm'

import { TypeormEntityBase } from '@libs/ddd/infrastructure/database/base-classes/typeorm.entity.base'

@Entity('student')
export class StudentOrmEntity extends TypeormEntityBase {
  /**
   * constructor
   * @param {StudentOrmEntity} props - user entity property
   */
  constructor(props?: StudentOrmEntity) {
    super(props)
  }

  @Column()
  name: string;
}
