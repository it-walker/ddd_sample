import { TypeormEntityBase } from '@libs/ddd/infrastructure/database/base-classes/typeorm.entity.base'
import { UserRoles } from '@modules/user/domain/entities/user.types'
import { Column, Entity } from 'typeorm'

@Entity('user')
export class UserOrmEntity extends TypeormEntityBase {
  /**
   * constructor
   * @param {UserOrmEntity} props - user entity property
   */
  constructor(props?: UserOrmEntity) {
    super(props)
  }

  @Column({ unique: true })
  email: string;

  @Column()
  country: string;

  @Column()
  postalCode: string;

  @Column()
  street: string;

  @Column({ type: 'set', enum: UserRoles, default: UserRoles.guest })
  role: UserRoles;
}
