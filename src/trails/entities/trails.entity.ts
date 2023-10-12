import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  Double,
} from 'typeorm';

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
}
