import { Controller, Post, Body, Request, HttpCode } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService) {}

    @Post('login')
    async login(@Body() LoginDto: LoginDto): Promise<any> {
        const user = await this.authService.validateUser(LoginDto.username, LoginDto.password)
        
        return this.authService.login(user)
    }
}