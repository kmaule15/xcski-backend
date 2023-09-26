import { ArrayNotEmpty, IsArray, IsIn, IsString } from 'class-validator';

export class TrailDto {
  // TODO add in more validators later as we need them

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsIn(['classic', 'skate'], { each: true })
  typesAllowed: string[];
}
