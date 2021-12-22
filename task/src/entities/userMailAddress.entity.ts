import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserMailAddress extends BaseEntity {
  @PrimaryGeneratedColumn()
  user: User;

  @Column()
  mailAddress: string;
}
