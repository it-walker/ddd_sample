import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserMailAddress } from './userMailAddress.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  name: string;

  @OneToMany(type => UserMailAddress, mailAddress => mailAddress.user)
  mailAddresses: Array<UserMailAddress>;
}
