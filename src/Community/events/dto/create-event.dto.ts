import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Trail } from 'src/trails/entities/trails.entity';
import { User } from 'src/users/entities/users.entity';

export class CreateEventDto {
  @IsNotEmpty()
  author: User;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  trail: Trail;

  @IsBoolean()
  @IsNotEmpty()
  isPublic: boolean;

  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @IsDate()
  @IsNotEmpty()
  updatedAt: Date;

  invitees?: User;

  participants?: User;
}
