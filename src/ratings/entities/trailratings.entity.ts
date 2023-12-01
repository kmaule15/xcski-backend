import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('trailratings')
export class TrailRating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('double precision')
  trailId: number;

  @Column()
  rating: number;
}
