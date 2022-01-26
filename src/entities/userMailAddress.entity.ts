import { User } from '@src/entities/user.entity'
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

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
