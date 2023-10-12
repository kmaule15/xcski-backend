import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrailUpdate } from './entities/trailupdates.entity';
import { Repository, MoreThanOrEqual } from 'typeorm';

@Injectable()
export class TrailUpdatesService {
  constructor(
    @InjectRepository(TrailUpdate)
    private trailUpdatesRepository: Repository<TrailUpdate>,
  ) {}

  async createTrailUpdate(
    trailName: string,
    description: string,
    startDateTime: Date,
    trailId: number,
    trailOpenPercentage: number,
  ): Promise<TrailUpdate> {
    try {
      if (
        !trailName ||
        !description ||
        !startDateTime ||
        !trailId ||
        !trailOpenPercentage
      ) {
        throw new BadRequestException('All fields must be filled.');
      }

      const newTrail = this.trailUpdatesRepository.create({
        trailName,
        description,
        startDateTime,
        trailId,
        trailOpenPercentage,
      });

      return await this.trailUpdatesRepository.save(newTrail);
    } catch (error) {
      console.error('Error occurred while creating trail update:', error);
      throw error;
    }
  }

  async updateTrailUpdate(id: number, trailUpdate: TrailUpdate): Promise<void> {
    try {
      await this.trailUpdatesRepository.update(id, trailUpdate);
    } catch (error) {
      console.error('Error occurred while updating trail update:', error);
      throw new Error('Failed to update trail update.');
    }
  }

  async getAllTrailUpdatesByTrailId(trailId: number): Promise<TrailUpdate[]> {
    try {
      return await this.trailUpdatesRepository.find({
        where: {
          trailId: trailId,
        },
        order: {
          startDateTime: 'DESC',
        },
      });
    } catch (error) {
      console.error(
        'Error occurred while finding all trail updates for a trail id:',
        error,
      );
      throw new Error('Failed to return all trails updates for a trail id.');
    }
  }

  async findTrailUpdateById(id: number): Promise<TrailUpdate> {
    try {
      return await this.trailUpdatesRepository.findOneByOrFail({ id: id });
    } catch (error) {
      console.error('Error occurred while finding trail update:', error);
      throw new Error('Failed to return trail update.');
    }
  }

  //probably won't use but might be nice later on?
  async findTrailUpdatesByIdandDate(
    trailId: number,
    startDate: Date,
  ): Promise<TrailUpdate[]> {
    try {
      return await this.trailUpdatesRepository.find({
        where: [
          { trailId: trailId },
          { startDateTime: MoreThanOrEqual(startDate) },
        ],
        order: {
          startDateTime: 'DESC',
        },
      });
    } catch (error) {
      console.error('Error occurred while finding trail update:', error);
      throw new Error('Failed to return trail update.');
    }
  }

  async removeTrailUpdateById(id: number): Promise<void> {
    try {
      await this.trailUpdatesRepository.delete(id);
    } catch (error) {
      console.error('Error occured while removing trail:', error);
      throw new Error('Failed to delete trail update');
    }
  }
}
