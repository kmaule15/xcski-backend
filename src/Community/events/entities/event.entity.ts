import { Trail } from 'src/trails/entities/trails.entity';
import { User } from 'src/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
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
  startTime: Date;

  @Column()
  endTime: Date;

  @Column()
  location: string;

  @Column('double precision', { nullable: true })
  latitude?: number;

  @Column('double precision', { nullable: true })
  longitude?: number;

  @ManyToOne(() => Trail, (trail) => trail.events)
  trail?: Trail;

  @Column()
  isPublic: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => User, (user) => user.invitedEvents)
  @JoinTable({
    name: 'event_invitees', // Name of the join table
    joinColumn: {
      name: 'event_id', // Name of the column in the join table that references the event entity
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id', // Name of the column in the join table that references the user entity
      referencedColumnName: 'id',
    },
  })
  invitees?: User[];

  @ManyToMany(() => User, (user) => user.participatedEvents)
  @JoinTable({
    name: 'event_participants',
    joinColumn: {
      name: 'event_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  participants?: User[];
}
