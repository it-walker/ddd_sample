import { UserMailAddress } from '@src/entities/userMailAddress.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

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
