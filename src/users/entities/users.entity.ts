import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Post } from 'src/Community/Posts/entities/post.entity';
import { Event } from 'src/Community/events/entities/event.entity';

@Entity('users')
@Unique(['email'])
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: ['user', 'admin', 'business'],
    default: 'user',
  })
  role: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @OneToMany(() => Post, (post) => post.author)
  posts?: Post[];

  @OneToMany(() => Event, (event) => event.author)
  authoredEvents?: Event[];

  @ManyToMany(() => Event, (event) => event.participants)
  participatedEvents?: Event[];

  @ManyToMany(() => Event, (event) => event.invitees)
  invitedEvents?: Event[];
}
