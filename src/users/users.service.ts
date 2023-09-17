import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository }from 'typeorm'
import { User } from './entities/users.entity'
import { JwtPayload } from './interfaces/jwt-payload.interface'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>
    ) {}

    async createUser(username: string, password: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = this.usersRepository.create({
            username,
            password: hashedPassword
        })

        return await this.usersRepository.save(newUser)
    }

    findAll(): Promise<User[]> {
        return this.usersRepository.find()
    }

    findOne(id: number): Promise<User> {
        return this.usersRepository.findOneByOrFail({id : id})
    }

    async create(user: User): Promise<User> {
        return this.usersRepository.save(user)
    }

    async update(id: number, user: User): Promise<void> {
        await this.usersRepository.update(id, user)
    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id)
    }

    async findUserByPayload(payload: JwtPayload): Promise<User | null> {
        return await this.usersRepository.findOne({
            where: {
                username: payload.username,
                id: payload.userId
            }
        })
    }

    async findUserByUsernameAndPassword(username:string, password: string): Promise<User | null> {
        const user = await this.usersRepository.findOne({ where: {username }})

        if (!user) {
            return null
        }

        const isPasswordMatching = await bcrypt.compare(password, user.password)

        if (!isPasswordMatching) {
            return null
        }

        return user
    }

}