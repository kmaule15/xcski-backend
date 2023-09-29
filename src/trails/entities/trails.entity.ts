import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

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

  // leaving as a string for now, but will need to update once map
  // stuff is figured out - will need to store address in correct format
  @Column()
  location: string;

  @Column({ type: 'enum', enum: ['Easy', 'Medium', 'Difficult'] })
  difficulty: string;

  @Column()
  length: number;

  @Column()
  estimatedTime: number;

  @Column({ type: 'enum', enum: ['Classic', 'Skate'], array: true })
  typesAllowed: string[];
}
