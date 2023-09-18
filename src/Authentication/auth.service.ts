import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { JwtPayload } from '../users/interfaces/jwt-payload.interface'
import { User } from 'src/users/entities/users.entity'

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
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

    async validateToken(jwt: string): Promise<any> {
        return this.jwtService.verify(jwt)
    }
}