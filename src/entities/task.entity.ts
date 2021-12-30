import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { TaskStatus } from '@/common/taskStatus';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column()
  status: TaskStatus;

  @Column()
  dueDate: Date;

  @Column()
  postponeCount: number;
}
