import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTrailRatingDto {
  @IsNumber()
  @IsNotEmpty()
  trailId: number;

  @IsNumber()
  @IsNotEmpty()
  rating: number;
}
