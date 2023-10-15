import { Trail } from 'src/trails/entities/trails.entity';
import { User } from 'src/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.authoredEvents)
  author: User;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  date: Date;

  @Column()
  location: string;

  @ManyToOne(() => Trail, (trail) => trail.events)
  trail: Trail;

  @Column()
  isPublic: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => User, (user) => user.invitedEvents)
  invitees: User;

  @ManyToMany(() => User, (user) => user.participatedEvents)
  participants: User;
}
