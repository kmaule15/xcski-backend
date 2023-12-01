import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrailRatingsService } from './trailratings.service';
import { TrailRating } from './entities/trailratings.entity';
import { TrailRatingsController } from './trailratings.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TrailRating])],
  controllers: [TrailRatingsController],
  providers: [TrailRatingsService],
  exports: [TrailRatingsService, TypeOrmModule],
})
export class TrailRatingsModule {}
