import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private eventsRepository: Repository<Event>,
  ) {}

  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    console.log('createEventDto', createEventDto);
    const { author, title, description, date, location, trail, isPublic } =
      createEventDto;

    const newEvent = this.eventsRepository.create({
      author,
      title,
      description,
      date,
      location,
      trail,
      isPublic,
    });
    return await this.eventsRepository.save(newEvent);
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
      return await this.eventsRepository.find();
    } catch (error) {
      console.error('Error occured while finding all events: ', error);
      throw new Error('Failed to return all events.');
    }
  }

  async findOneEvent(id: number): Promise<Event> {
    try {
      return await this.eventsRepository.findOneByOrFail({ id: id });
    } catch (error) {
      console.error('Error occured while finding event: ', error);
      throw new Error('Failed to return trail');
    }
  }

  async removeEvent(id: number): Promise<void> {
    try {
      await this.eventsRepository.delete(id);
    } catch (error) {
      console.error('Error occured while removing trail: ', error);
      throw new Error('Failed to delete trail');
    }
  }
}
