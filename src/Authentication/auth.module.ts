import { Module } from '@nestjs/common';
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from './strategies/jwt.strategy'
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { EmailModule } from '../email/email.module';

@Module({
    providers: [JwtStrategy, AuthService],
    controllers: [AuthController],
    imports: [
        UsersModule,
        PassportModule,
        EmailModule,
        JwtModule.register({
         secret: process.env.JWT_SECRET,
         signOptions: { expiresIn: '60m' }  
        })
    ],
    exports: [AuthService]
})
export class AuthModule {}