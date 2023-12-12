import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Trail } from 'src/trails/entities/trails.entity';
import { GetUser } from 'src/Authentication/decorators/get-user.decorator';
import { JwtAuthGuard } from 'src/Authentication/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('id/:id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Get('username/:username')
  findOneByUsername(@Param('username') username: string): Promise<User> {
    return this.usersService.findUserByUsername(username);
  }

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<User | { message: string }> {
    try {
      return await this.usersService.createUser(
        createUserDto.username,
        createUserDto.password,
        createUserDto.email,
      );
    } catch (error) {
      if (
        error.message === 'Username already exists' ||
        error.message === 'Email already exists'
      ) {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            error: error.message,
          },
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('id/:id')
  update(@Param('id') id: number, @Body() user: User): Promise<void> {
    return this.usersService.update(id, user);
  }

  @Put('mytrails/:id')
  @UseGuards(JwtAuthGuard)
  updateMyTrails(
    @Param('id') id: number,
    @Body() body: { myTrails: Trail[] },
  ): Promise<void> {
    return this.usersService.updateMyTrails(id, body.myTrails);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}
