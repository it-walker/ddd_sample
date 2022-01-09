import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import {User} from './user.entity';

@Entity()
export class UserMailAddress extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ManyToOne((type) => User, (user) => user.mailAddresses)
  @JoinColumn({
    name: 'userId',
    referencedColumnName: 'id',
  })
  readonly user: User;

  @Column()
  value: string;
}
