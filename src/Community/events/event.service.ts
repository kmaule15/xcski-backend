import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { User } from 'src/users/entities/users.entity';
import { Trail } from 'src/trails/entities/trails.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private eventsRepository: Repository<Event>,
    @InjectRepository(User) private usersRepository: Repository<User>, // @InjectRepository(Trail) private trailsRepository: Repository<Trail>,
  ) {}

  async createEvent(
    createEventDto: CreateEventDto,
    userId: number,
  ): Promise<Event> {
    const author = await this.usersRepository.findOneByOrFail({ id: userId });
    const event = new Event();
    event.author = author;
    event.title = createEventDto.title;
    event.description = createEventDto.description;
    event.date = createEventDto.date;
    event.startTime = createEventDto.startTime;
    event.endTime = createEventDto.endTime;
    event.location = createEventDto.location;
    event.latitude = createEventDto.latitude;
    event.longitude = createEventDto.longitude;
    event.trail = createEventDto.trail;
    event.isPublic = createEventDto.isPublic;
    event.invitees = createEventDto.invitees;
    event.participants = createEventDto.participants;

    return await this.eventsRepository.save(event);
  }

  async updateEvent(id: number, event: Event): Promise<void> {
    try {
      await this.eventsRepository.update(id, event);
    } catch (error) {
      console.error('Error occured while updating event: ', error);
      throw new Error('Failed to update the event');
    }
  }
  async getAllEvents(): Promise<Event[]> {
    try {
      return await this.eventsRepository.find({
        relations: ['author'],
      });
    } catch (error) {
      console.error('Error occured while finding all events: ', error);
      throw new Error('Failed to return all events.');
    }
  }

  async findOneEvent(id: number): Promise<Event> {
    try {
      return await this.eventsRepository.findOneOrFail({
        where: { id: id },
        relations: ['invitees', 'author', 'trail'],
      });
    } catch (error) {
      console.error('Error occured while finding event: ', error);
      throw new Error('Failed to return event');
    }
  }

  async removeEvent(id: number): Promise<void> {
    try {
      await this.eventsRepository.delete(id);
    } catch (error) {
      console.error('Error occured while removing event: ', error);
      throw new Error('Failed to delete event');
    }
  }
}
