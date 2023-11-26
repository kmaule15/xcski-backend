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
import { TrailsService } from './trails.service';
import { Trail } from './entities/trails.entity';
import { JwtAuthGuard } from 'src/Authentication/guards/jwt-auth.guard';
import { CreateTrailDto } from './dto/create-trail.dto';

@Controller('trails')
export class TrailsController {
  constructor(private readonly trailsService: TrailsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createTrail(@Body() createTrailDto: CreateTrailDto): Promise<Trail> {
    return this.trailsService.createTrail(createTrailDto);
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
