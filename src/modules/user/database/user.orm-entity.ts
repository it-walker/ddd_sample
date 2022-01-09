import { TypeormEntityBase } from '@src/libs/ddd/infrastructure/database/base-classes/typeorm.entity.base';
import { Column, Entity } from 'typeorm';

import { UserRoles } from '../domain/entities/user.types';

@Entity('user')
/**
 * user orm entity class
 */
export class UserOrmEntity extends TypeormEntityBase {
  /**
   * constructor
   * @param {UserOrmEntity} props - user entity property
   */
  constructor(props?: UserOrmEntity) {
    super(props);
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
