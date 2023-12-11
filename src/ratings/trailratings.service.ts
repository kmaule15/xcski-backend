import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrailRating } from './entities/trailratings.entity';
import { Repository } from 'typeorm';
import { CreateTrailRatingDto } from './dto/create-trail-rating.dto';

@Injectable()
export class TrailRatingsService {
  constructor(
    @InjectRepository(TrailRating)
    private trailRatingsRepository: Repository<TrailRating>,
  ) {}

  async createTrailRating(
    createTrailRatingDto: CreateTrailRatingDto,
  ): Promise<TrailRating> {
    const trailRating = new TrailRating();
    trailRating.rating = createTrailRatingDto.rating;
    trailRating.trailId = createTrailRatingDto.trailId;
    console.log(createTrailRatingDto);
    try {
      return await this.trailRatingsRepository.save(trailRating);
    } catch (error) {
      console.error('Error occurred while creating trail rating:', error);
      throw new Error('Failed to create trail rating.');
    }
  }

  async updateTrailRating(id: number, trailRating: TrailRating): Promise<void> {
    try {
      await this.trailRatingsRepository.update(id, trailRating);
    } catch (error) {
      console.error('Error occurred while updating trail rating:', error);
      throw new Error('Failed to update trail rating.');
    }
  }

  async calculateRatingForTrail(id: number): Promise<number> {
    try {
      const ratings = await this.findRatingsForOneTrail(id);
      let totalRatings = 0;
      let numRatings = 0;
      if (ratings.length == 0) {
        console.log('comp trail:::::: ' + ratings);
        return 0;
      } else {
        ratings.forEach((element) => {
          totalRatings += element.rating;
          numRatings++;
        });
      }
      const finRating = totalRatings / numRatings;
      console.log('comp trail:::::: ' + finRating);
      return finRating;
    } catch (error) {
      console.error(
        'Error occurred while calculating total trail rating:',
        error,
      );
      throw new Error('Failed to return composite trail rating.');
    }
  }

  async findRatingsForOneTrail(id: number): Promise<TrailRating[]> {
    try {
      return await this.trailRatingsRepository.findBy({ trailId: id });
    } catch (error) {
      console.error('Error occurred while finding trail ratings:', error);
      throw new Error('Failed to return trail ratings.');
    }
  }
}
