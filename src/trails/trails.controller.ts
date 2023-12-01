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

  @Put('/:id')
  async rerateTrailFromRating(
    @Param('id') id: number,
    @Body() ratingValue: number,
  ): Promise<void> {
    const trail = await this.trailsService.findOneTrail(id);
    trail.rating = ratingValue; //call trailratings service call to get rating for trail
    return this.trailsService.updateTrail(id, trail);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() trail: Trail): Promise<void> {
    return this.trailsService.updateTrail(id, trail);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.trailsService.removeTrail(id);
  }

  @Get('grooming-data')
  async getGroomingData(): Promise<void> {
    console.log('Fetch Started');
    await this.trailsService.getTrailsAndSaveToDatabase();
    console.log('Fetch Completed');
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
