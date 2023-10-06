
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/users.entity';
import { PassportModule } from '@nestjs/passport';
import { EmailModule } from '../email/email.module';


@Module({
  imports: [TypeOrmModule.forFeature([User]),
  PassportModule,
  EmailModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService] 
})
export class UsersModule {}