import { Controller, Get, Post, Body, Put, Param, Delete, HttpException, HttpStatus } from '@nestjs/common'
import { UsersService } from './users.service'
import { User } from './entities/users.entity'
import { CreateUserDto } from './dto/create-user.dto'

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
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User | { message: string }> {
        try {
            return await this.usersService.createUser(createUserDto.username, createUserDto.password, createUserDto.email);
        } catch (error) {
            if (error.message === 'Username already exists' || error.message === 'Email already exists') {
                throw new HttpException({
                    status: HttpStatus.CONFLICT,
                    error: error.message,
                }, HttpStatus.CONFLICT);
            }
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Internal Server Error',
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
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