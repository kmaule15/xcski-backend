import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import * as bcrypt from 'bcrypt';
import { Trail } from 'src/trails/entities/trails.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createUser(
    username: string,
    password: string,
    email: string,
  ): Promise<User> {
    const existingUsername = await this.usersRepository.findOne({
      where: { username },
    });
    if (existingUsername) {
      throw new Error('Username already exists');
    }

    const existingEmail = await this.usersRepository.findOne({
      where: { email },
    });
    if (existingEmail) {
      throw new Error('Email already exists');
    }

    const newUser = this.usersRepository.create({ username, password, email });
    return await this.usersRepository.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneByOrFail({ id: id });
  }

  async create(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  async update(id: number, user: User): Promise<void> {
    await this.usersRepository.update(id, user);
  }

  async updateMyTrails(id: number, myTrails: Trail[]): Promise<void> {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: id },
        relations: ['myTrails'],
      });

      if (!user) {
        throw new Error(`User with id ${id} not found`);
      }

      user.myTrails = myTrails;
      await this.usersRepository.save(user);
      await this.usersRepository.findOne({ where: { id: id } });
    } catch (error) {
      console.error(
        'Error occurred while adding trail to users trails: ',
        error,
      );
      throw new Error('Failed to add the trail to the users trails');
    }
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async findUserByPayload(payload: JwtPayload): Promise<User | null> {
    return await this.usersRepository.findOne({
      where: {
        username: payload.username,
        id: payload.userId,
      },
    });
  }

  async findUserByUsernameAndPassword(
    username: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { username } });

    if (!user) {
      return null;
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password);

    if (!isPasswordMatching) {
      return null;
    }

    return user;
  }

  async findUserbyEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async findUserByUsername(username: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: { username },
      relations: ['invitedEvents', 'participatedEvents', 'myTrails'],
    });
  }
}
