// import { MailAddress } from './mailAddress';

// /**
//  * userIdを識別子とするエンティティ
//  */
// export class User {
//   private userId: string;
//   private name: string;
//   private mailAddress: Array<MailAddress>;
// }

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserDomain {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ length: 100 })
  fullName: string;

  @Column({ length: 100 })
  email: string;

  @Column()
  password: string;
}
