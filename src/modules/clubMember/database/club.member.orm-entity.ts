import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

import { TypeormEntityBase } from '@src/libs/ddd/infrastructure/database/base-classes/typeorm.entity.base'
import { ClubOrmEntity } from '@src/modules/club/database/club.orm-entity'

@Entity('club_member')
export class ClubMemberOrmEntity extends TypeormEntityBase {
  /**
   * constructor
   * @param {ClubMemberOrmEntity} props
   */
  constructor(props?: ClubMemberOrmEntity) {
    super(props)
  }

  @Column({ unique: true })
  clubId: string;

  @Column({ unique: true })
  studentId: string;

  // @ManyToOne((type) => ClubOrmEntity, (club) => club.members)
  // @JoinColumn({ name: 'clubId' })
  // readonly club?: ClubOrmEntity;
}
