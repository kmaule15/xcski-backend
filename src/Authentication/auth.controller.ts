import { Controller, Post, Body, Request, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UpdateEventDto } from 'src/Community/events/dto/update-event.dto';
import { EventsService } from 'src/Community/events/event.service';
import { User } from 'src/users/entities/users.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly eventsService: EventsService,
  ) {}

  @Post('login')
  async login(@Body() LoginDto: LoginDto): Promise<any> {
    const user = await this.authService.validateUser(
      LoginDto.username,
      LoginDto.password,
    );

    return this.authService.login(user);
  }

  @Post('email')
  CheckExistReset(@Body() body: { email: string }): Promise<any> {
    const { email } = body;
    return this.authService.CheckExistReset(email);
  }

  @Post('invite')
  sendEventInvite(
    @Body() body: { email: string; eventId: string },
  ): Promise<any> {
    const { email, eventId } = body;
    return this.authService.sendEventInvite(email, eventId);
  }

  @Post('acceptinvite')
  async acceptInvite(
    @Body()
    body: {
      token: string;
      eventId: number;
      participants: User[];
      invitees: User[];
    },
  ): Promise<any> {
    const { token, eventId, participants, invitees } = body;

    try {
      await this.authService.validateToken(token);
      await this.eventsService.updateEventParticipants(
        eventId,
        participants,
        invitees,
      );
    } catch (error) {
      console.log(error);
    }
  }

  @Post('google')
  async GoogleDecode(@Body() token: any): Promise<any> {
    const decodedToken = await this.authService.decodeToken(
      token.response.credential,
    );
    const username = await decodedToken.name;
    const Atoken = await this.authService.GoogleLoginCreate(decodedToken);
    return { username, Atoken };
  }

  @Post('resetpassword')
  async resetPassword(
    @Body() requestBody: { token: string; confirmPassword: string },
  ) {
    const { token, confirmPassword } = requestBody;

    try {
      const decodedToken = await this.authService.validateToken(token);
      await this.authService.updatePassword(
        decodedToken.userId,
        confirmPassword,
      );
    } catch (error) {
      console.log(error);
    }
  }
}
