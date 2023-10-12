import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    BeforeInsert,
    BeforeUpdate,
    OneToMany
} from 'typeorm' 
import * as bcrypt from 'bcrypt'
import { Post } from 'src/Community/Posts/entities/post.entity'

@Entity('users')
@Unique(['email'])
@Unique(['username'])
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    username: string

    @Column()
    password: string

    @Column({ type: 'enum', enum: ['user', 'admin', 'business'], default: 'user'})
    role: string

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10)
    }

    @OneToMany(() => Post, post => post.author)
    posts: Post[]
}