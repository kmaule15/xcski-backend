import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trail } from './entities/trails.entity';
import { Repository } from 'typeorm';
import { CreateTrailDto } from './dto/create-trail.dto';

@Injectable()
export class TrailsService {
  constructor(
    @InjectRepository(Trail) private trailsRepository: Repository<Trail>,
  ) {}

  async createTrail(createTrailDto: CreateTrailDto): Promise<Trail> {
    const trail = new Trail();
    trail.name = createTrailDto.name;
    trail.description = createTrailDto.description;
    trail.location = createTrailDto.location;
    trail.latitude = createTrailDto.latitude;
    trail.longitude = createTrailDto.longitude;
    trail.difficulty = createTrailDto.difficulty;
    trail.length = createTrailDto.length;
    trail.estimatedTime = createTrailDto.estimatedTime;
    trail.typesAllowed = createTrailDto.typesAllowed;

    try {
      return await this.trailsRepository.save(trail);
    } catch (error) {
      console.error('Error occurred while creating trail:', error);
      throw new Error('Failed to create trail.');
    }
  }

  async updateTrail(id: number, trail: Trail): Promise<void> {
    try {
      await this.trailsRepository.update(id, trail);
    } catch (error) {
      console.error('Error occurred while updating trail:', error);
      throw new Error('Failed to update trail.');
    }
  }

  async findAllTrails(): Promise<Trail[]> {
    try {
      return await this.trailsRepository.find();
    } catch (error) {
      console.error('Error occurred while finding all trails:', error);
      throw new Error('Failed to return all trails.');
    }
  }

  async findOneTrail(id: number): Promise<Trail> {
    try {
      return await this.trailsRepository.findOneByOrFail({ id: id });
    } catch (error) {
      console.error('Error occurred while finding trail:', error);
      throw new Error('Failed to return trail.');
    }
  }

  async removeTrail(id: number): Promise<void> {
    try {
      await this.trailsRepository.delete(id);
    } catch (error) {
      console.error('Error occured while removing trail:', error);
      throw new Error('Failed to delete trail');
    }
  }
}
