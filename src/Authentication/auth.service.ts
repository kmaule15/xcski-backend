import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { JwtPayload } from '../users/interfaces/jwt-payload.interface'
import { User } from 'src/users/entities/users.entity'
import { EmailService } from '../email/email.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly emailService: EmailService
    ) {}

    async validateUserByJwt(payload: JwtPayload): Promise<User | null> {
        const user = await this.usersService.findUserByPayload(payload)

        if (!user) {
            throw new UnauthorizedException()
        }

        return user
    }

    async validateUser(username: string, password: string): Promise<User | null> {
        const user = await this.usersService.findUserByUsernameAndPassword(username, password);
    
        if (!user) {
            throw new UnauthorizedException();
        }
    
        return user;
    }

    async login(user: any) {
        const payload: JwtPayload = {
            username: user.username,
            userId: user.id
        }

        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    async ResetToken(email: string, id: number, username:string){
        const payload: JwtPayload = {
            email: email,
            username: username,
            userId: id
        }

       return {access_token: this.jwtService.sign(payload)}
    }

    async validateToken(jwt: string): Promise<any> {
        return this.jwtService.verify(jwt)
    }
    async decodeToken(jwt: string): Promise<any> {
        return this.jwtService.decode(jwt)
    }

    async GoogleLoginCreate(GoogleObj: any){
        const user = await this.usersService.findUserbyEmail(GoogleObj.email)
        if(user){
            console.log("is good")
            return this.login(user)
        }else{
            console.log(GoogleObj.email)
            console.log(GoogleObj.name)
            console.log(GoogleObj.locale)
            this.usersService.createUser(GoogleObj.name, GoogleObj.locale, GoogleObj.email)
            console.log(GoogleObj.email)
            const user = await this.usersService.findUserbyEmail(GoogleObj.email)
            console.log(user)
            return this.login(user)
        }

    }

    async updatePassword(id: number, pass: string): Promise<void> {
        const user = await this.usersService.findOne(id);
      
        user.password = pass;
      
        await this.usersService.update(id, user)
    }

    async CheckExistReset(email: string): Promise< { access_token: string} | null > {
        try{
            //checks if exists
            const user = await this.usersService.findUserbyEmail(email)
            
            //Create token
            const token = this.ResetToken(email, user.id, user.username);

            //Create Email with token url
            const ET = 'http://localhost:3001/PWU/' +(await token).access_token;
            if (user){
                const emailOptions = {
                    from: 'XCSadm@gmail.com',
                    to: email,
                    subject: 'Heck',
                    html: "<a href=" +ET+ ">Tester</a> ",
                  };
                  
            //Send email      
            await this.emailService.sendEmail(emailOptions); 
    
            return token;
            }
            
        }catch(error){
            console.log(error)
        }
    
    }
}