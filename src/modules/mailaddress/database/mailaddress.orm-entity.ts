import { TypeormEntityBase } from '@src/libs/ddd/infrastructure/database/base-classes/typeorm.entity.base';
import { Column, Entity } from 'typeorm';

@Entity('mailaddress')
/**
 * MailaddressOrmEntity class
 */
export class MailaddressOrmEntity extends TypeormEntityBase {
  /**
   * constructor
   * @param {MailaddressOrmEntity} props
   */
  constructor(props?: MailaddressOrmEntity) {
    super(props);
  }

  @Column({ unique: true })
  userId: string;

  @Column()
  email: string;

  // @ManyToOne(() => UserOrmEntity, (user) => user.mailAddresses)
  // @JoinColumn({
  //   name: 'userId',
  //   referencedColumnName: 'id',
  // })
  // readonly user: UserOrmEntity;
}
