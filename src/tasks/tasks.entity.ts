// task.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../auth/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: false })
  completed: boolean;

  @Column({ nullable: true }) // This allows the image to be nullable
  imagePath: string; // Assuming you store the path to the image in the database

  @Column({ default: false }) // Add is_deleted field with default value false
  is_deleted: boolean;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
