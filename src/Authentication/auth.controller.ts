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

    @Post('email')
    CheckExistReset(@Body() body: {email: string}): Promise<any> {
      const { email } = body; 
      return this.authService.CheckExistReset(email)
    }
    @Post('google')
    async GoogleDecode(@Body() token: any) : Promise<{ username: any; Atoken: Promise<{ access_token: string; }>; }>{
      const decodedToken = await this.authService.decodeToken(token.response.credential);
      const username = decodedToken.name
      const Atoken = this.authService.GoogleLoginCreate(decodedToken)
    return  {username, Atoken };


      
    }

    @Post('resetpassword')
  async resetPassword(@Body() requestBody: { token: string, confirmPassword: string }) {
    const { token, confirmPassword } = requestBody;

    try {
      
      const decodedToken = await this.authService.validateToken(token); 
      console.log(decodedToken.userId)
      console.log(confirmPassword)
      await this.authService.updatePassword(decodedToken.userId, confirmPassword);

    } catch (error) {
     console.log(error);
    }
  }

}