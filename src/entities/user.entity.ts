// import {
//   BaseEntity,
//   Column,
//   Entity,
//   OneToMany,
//   PrimaryGeneratedColumn,
// } from 'typeorm';

import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// import { UserMailAddress } from './userMailAddress.entity';

// @Entity()
// export class User extends BaseEntity {
//   @PrimaryGeneratedColumn()
//   userId: number;

//   @Column()
//   name: string;

//   @OneToMany(() => UserMailAddress, (mailAddress) => mailAddress.user)
//   mailAddresses: Array<UserMailAddress>;
// }

// import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ length: 100 })
  fullName: string;

  @Column({ length: 100 })
  email: string;

  @Column()
  password: string;
}
