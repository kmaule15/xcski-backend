import {
  ArrayNotEmpty,
  IsArray,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class TrailNodeDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  coordinates: number[];
}

export class CreateTrailDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @IsNumber()
  rating: number;

  @IsString()
  @IsNotEmpty()
  difficulty: string;

  @IsNumber()
  @IsNotEmpty()
  length: number;

  @IsNumber()
  @IsNotEmpty()
  estimatedTime: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsIn(['classic', 'skate', 'Skating', 'Backcountry'], { each: true })
  typesAllowed: string[];

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  Nodes: TrailNodeDto[];
}
