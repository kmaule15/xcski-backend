import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';
import { Event } from 'src/Community/events/entities/event.entity';

@Entity('trails')
@Unique(['name'])
@Unique(['location'])
export class Trail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  location: string;

  @Column('double precision')
  latitude: number;

  @Column('double precision')
  longitude: number;

  @Column({ type: 'enum', enum: ['Easy', 'Medium', 'Difficult'] })
  difficulty: string;

  @Column()
  length: number;

  @Column()
  estimatedTime: number;

  @Column({ type: 'enum', enum: ['Classic', 'Skate'], array: true })
  typesAllowed: string[];

  @OneToMany(() => Event, (event) => event.trail)
  events: Event[];
}
