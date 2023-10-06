import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository }from 'typeorm'
import { User } from './entities/users.entity'
import { JwtPayload } from './interfaces/jwt-payload.interface'
import * as bcrypt from 'bcrypt'
import { EmailService } from '../email/email.service';
import { throwError } from 'rxjs'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        private readonly emailService: EmailService
    ) {}

    async createUser(username: string, password: string, email: string): Promise<User> {
        try {
        
            // const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = this.usersRepository.create({
                username,
                password,
                email: email
            });
    
            
            return await this.usersRepository.save(newUser);
        } catch (error) {
            console.error('Error occurred:', error);
            throw error;
        }
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

    async CheckExistReset(email: string): Promise< void > {
        try{

            const user = await this.usersRepository.findOne({ where: {email }})
            console.log(user);
          
            if (user){
                const emailOptions = {
                    from: 'XCSadm@gmail.com',
                    to: email,
                    subject: 'Heck',
                    text: ' Yea'
                  };
    
                  await this.emailService.sendEmail(emailOptions); 
            }else{
               throw Error('Make an Account loser');
            }
            

          

        }catch(error){
            console.log(error)
        
        }
    
    }

}