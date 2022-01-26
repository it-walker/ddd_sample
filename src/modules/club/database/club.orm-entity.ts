import { Column, Entity } from 'typeorm'

import { TypeormEntityBase } from '@libs/ddd/infrastructure/database/base-classes/typeorm.entity.base'

@Entity('club')
export class ClubOrmEntity extends TypeormEntityBase {
  /**
   * constructor
   * @param {ClubOrmEntity} props - club entity property
   */
  constructor(props?: ClubOrmEntity) {
    super(props)
  }

  @Column({ unique: true })
  name: string;

  @Column()
  isApproval: boolean;
}
