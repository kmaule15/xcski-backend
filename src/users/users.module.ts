
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/users.entity';
import { PassportModule } from '@nestjs/passport';


@Module({
  imports: [TypeOrmModule.forFeature([User]),
  PassportModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService] 
})
export class UsersModule {}