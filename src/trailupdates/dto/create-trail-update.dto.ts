import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TrailUpdateDto {
  @IsNumber()
  @IsNotEmpty()
  trailId: number;

  @IsString()
  @IsNotEmpty()
  trailName: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  trailOpenPercentage: number;

  @IsDate()
  @IsNotEmpty()
  startDateTime: Date;
}
