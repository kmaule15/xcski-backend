import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { EventsService } from './event.service';
import { Event } from './entities/event.entity';
import { JwtAuthGuard } from 'src/Authentication/guards/jwt-auth.guard';
import { GetUser } from 'src/Authentication/decorators/get-user.decorator';
import { User } from 'src/users/entities/users.entity';
import { Trail } from 'src/trails/entities/trails.entity';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createEvent(
    @Body() createEventDto: CreateEventDto,
    @GetUser() user: User,
  ): Promise<Event> {
    return this.eventsService.createEvent(createEventDto, user.id);
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
