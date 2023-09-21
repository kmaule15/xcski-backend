import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common'
import { UsersService } from './users.service'
import { User } from './entities/users.entity'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll()
    }

    @Get('id')
    findOne(@Param('id') id: number): Promise<User> {
        return this.usersService.findOne(id)
    }

    @Post()
    createUser(@Body() user: User): Promise<User> {
      
      return this.usersService.createUser(user.username,user.password,user.email)
    }


    @Put(':id')
    update(@Param('id') id: number, @Body() user: User): Promise<void> {
      return this.usersService.update(id, user);
    }
  
    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
      return this.usersService.remove(id);
    }
}