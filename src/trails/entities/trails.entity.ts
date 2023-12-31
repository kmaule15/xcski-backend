import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Event } from 'src/Community/events/entities/event.entity';
import { User } from 'src/users/entities/users.entity';

@Entity('trails')
@Unique(['name'])
//@Unique(['location'])
export class Trail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.createdTrails)
  author?: User;

  @Column()
  description: string;

  @Column()
  location: string;

  @Column('double precision')
  latitude: number;

  @Column('double precision')
  longitude: number;

  @Column({ nullable: true, type: 'numeric', precision: 3, scale: 2 })
  rating: number;

  @Column({
    type: 'enum',
    enum: [
      'Freeride',
      'Novice',
      'Easy',
      'Intermediate',
      'Medium',
      'Difficult',
      'Advanced',
      'Expert',
    ],
  })
  difficulty: string;

  @Column()
  length: number;

  @Column()
  estimatedTime: number;

  @Column({
    type: 'enum',
    enum: [
      'Classic',
      'Classick',
      'Skate',
      'Skating',
      'Backcountry',
      'No',
      'Snowmobile',
      'Hike',
      'Mogul',
      'Fatbike',
    ],
    array: true,
  })
  typesAllowed: string[];

  @Column({ type: 'jsonb', array: false, nullable: true })
  Nodes: { id: number; coordinates: number[] }[];

  @OneToMany(() => Event, (event) => event.trail)
  events?: Event[];

  @ManyToMany(() => User, (user) => user.myTrails)
  usersMyTrails?: User[];
}
