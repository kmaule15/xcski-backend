import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';
import * as nodemailer from 'nodemailer';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendEmail(@Body() emailOptions: nodemailer.SendMailOptions) {
    try {
      await this.emailService.sendEmail(emailOptions);
      return { message: 'Email sent successfully' };
    } catch (error) {
      return { error: 'Error sending email' };
    }
  }
}