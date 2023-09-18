import { Module } from '@nestjs/common';
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
    providers: [JwtStrategy],
    imports: [
        JwtModule.register({
         secret: process.env.JWT_SECRET,
         signOptions: { expiresIn: '60m' }  
        })
    ]
})
export class AuthModule {}