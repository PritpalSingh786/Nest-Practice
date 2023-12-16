import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SummaryTable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  username: string;

  @Column()
  task_count: number;
}