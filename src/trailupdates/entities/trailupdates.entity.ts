import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('trailupdates')
export class TrailUpdate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  trailName: string;

  @Column()
  description: string;

  @Column()
  startDateTime: Date;

  @Column()
  trailId: number;

  @Column()
  trailOpenPercentage: number;
}
