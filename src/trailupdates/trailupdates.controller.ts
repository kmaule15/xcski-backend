import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Param,
  Post,
} from '@nestjs/common';
import { TrailUpdatesService } from './trailupdates.service';
import { TrailUpdate } from './entities/trailupdates.entity';
import { TrailUpdateDto } from './dto/create-trail-update.dto';

@Controller('trailupdates')
export class TrailUpdatesController {
  constructor(private readonly trailUpdatesService: TrailUpdatesService) {}

  @Post()
  createTrailUpdate(
    @Body() trailUpdateDto: TrailUpdateDto,
  ): Promise<TrailUpdate> {
    return this.trailUpdatesService.createTrailUpdate(
      trailUpdateDto.trailName,
      trailUpdateDto.description,
      trailUpdateDto.startDateTime,
      trailUpdateDto.trailId,
      trailUpdateDto.trailOpenPercentage,
    );
  }

  @Put('/:id')
  update(
    @Param('id') id: number,
    @Body() trailUpdate: TrailUpdate,
  ): Promise<void> {
    return this.trailUpdatesService.updateTrailUpdate(id, trailUpdate);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.trailUpdatesService.removeTrailUpdateById(id);
  }

  @Get('/trail/:trailId')
  getAllTrailUpdatesByTrailId(trailId: number): Promise<TrailUpdate[]> {
    return this.trailUpdatesService.getAllTrailUpdatesByTrailId(trailId);
  }

  @Get('/:id')
  findOne(@Param('id') id: number): Promise<TrailUpdate> {
    return this.trailUpdatesService.findTrailUpdateById(id);
  }
}
