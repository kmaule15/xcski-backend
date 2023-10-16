import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private eventsRepository: Repository<Event>,
  ) {}

  // async createEvent ()
  // async updateEvent ()
  // async getAllEvents ()
  // async findOneEvent ()
  // async removeEvent ()
}
