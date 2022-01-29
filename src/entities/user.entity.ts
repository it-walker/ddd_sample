import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { UserMailAddress } from '@src/entities/userMailAddress.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column()
  age: number;

  @OneToMany(() => UserMailAddress, (mailAddress) => mailAddress.user)
  mailAddresses: UserMailAddress[];
}
