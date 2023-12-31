import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from './event.controller';
import { EventsService } from './event.service';
import { UsersModule } from 'src/users/users.module';
import { Module } from '@nestjs/common';
import { Event } from './entities/event.entity';
import { TrailsModule } from 'src/trails/trails.module';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), UsersModule, TrailsModule],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
