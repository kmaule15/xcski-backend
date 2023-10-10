import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trail } from './entities/trails.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TrailsService {
  constructor(
    @InjectRepository(Trail) private trailsRepository: Repository<Trail>,
  ) {}

  async createTrail(
    name: string,
    description: string,
    location: string,
    latitude: number,
    longitude: number,
    difficulty: string,
    length: number,
    estimatedTime: number,
    typesAllowed: string[],
  ): Promise<Trail> {
    try {
      console.log('latitude', latitude);
      console.log('longitude', longitude);
      if (
        !name ||
        !description ||
        !location ||
        !latitude ||
        !longitude ||
        !difficulty ||
        !length ||
        !estimatedTime ||
        typesAllowed.length === 0
      ) {
        throw new BadRequestException('All fields must be filled.');
      }

      const newTrail = this.trailsRepository.create({
        name,
        description,
        location,
        latitude,
        longitude,
        difficulty,
        length,
        estimatedTime,
        typesAllowed,
      });

      return await this.trailsRepository.save(newTrail);
    } catch (error) {
      console.error('Error occurred while creating trail:', error);
      throw error;
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
