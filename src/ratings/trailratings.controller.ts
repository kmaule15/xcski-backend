import {
  Body,
  Controller,
  Get,
  Put,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TrailRatingsService } from './trailratings.service';
import { TrailRating } from './entities/trailratings.entity';
import { CreateTrailRatingDto } from './dto/create-trail-rating.dto';

@Controller('trailratings')
export class TrailRatingsController {
  constructor(private readonly trailsRatingsService: TrailRatingsService) {}

  @Post()
  createTrail(
    @Body() createTrailRatingDto: CreateTrailRatingDto,
  ): Promise<TrailRating> {
    //TODO: Check to make sure same user can't rate more than once
    return this.trailsRatingsService.createTrailRating(createTrailRatingDto);
  }

  @Put('/update/:id')
  update(@Param('id') id: number, @Body() trail: TrailRating): Promise<void> {
    return this.trailsRatingsService.updateTrailRating(id, trail);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<number> {
    return this.trailsRatingsService.calculateRatingForTrail(id);
  }
}
