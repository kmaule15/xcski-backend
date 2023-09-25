import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Param,
  Post,
} from '@nestjs/common';
import { TrailsService } from './trails.service';
import { Trail } from './entities/trails.entity';

@Controller('trails')
export class TrailsController {
  constructor(private readonly trailsService: TrailsService) {}

  @Post()
  createTrail(@Body() trail: Trail): Promise<Trail> {
    return this.trailsService.createTrail(
      trail.name,
      trail.description,
      trail.location,
      trail.difficulty,
      trail.length,
      trail.estimatedTime,
      trail.typesAllowed,
    );
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() trail: Trail): Promise<void> {
    return this.trailsService.updateTrail(id, trail);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.trailsService.removeTrail(id);
  }

  @Get()
  findAll(): Promise<Trail[]> {
    return this.trailsService.findAllTrails();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Trail> {
    return this.trailsService.findOneTrail(id);
  }
}
