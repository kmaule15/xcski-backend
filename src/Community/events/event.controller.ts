import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Param,
  Post,
} from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { EventsService } from './event.service';
import { Event } from './entities/event.entity';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  createEvent(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return this.eventsService.createEvent(createEventDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() event: Event): Promise<void> {
    return this.eventsService.updateEvent(id, event);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.eventsService.removeEvent(id);
  }

  @Get()
  findAll(): Promise<Event[]> {
    return this.eventsService.getAllEvents();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Event> {
    return this.eventsService.findOneEvent(id);
  }
}
