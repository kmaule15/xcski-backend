import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    BeforeInsert,
    BeforeUpdate
} from 'typeorm' 
import * as bcrypt from 'bcrypt'

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
}