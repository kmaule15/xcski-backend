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

  @Column()
  location: string;

  @Column({ type: 'enum', enum: ['easy', 'medium', 'difficult'] })
  difficulty: string;

  @Column()
  length: number;

  @Column()
  estimatedTime: number;

  @Column({ type: 'enum', enum: ['classic', 'skate'], array: true })
  typesAllowed: string[];
}
