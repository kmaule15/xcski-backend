import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trail } from './entities/trails.entity';
import { Repository } from 'typeorm';
import { CreateTrailDto } from './dto/create-trail.dto';
import axios from 'axios';
import { User } from 'src/users/entities/users.entity';

@Injectable()
export class TrailsService {
  constructor(
    @InjectRepository(Trail) private trailsRepository: Repository<Trail>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createTrail(
    createTrailDto: CreateTrailDto,
    userId: number,
  ): Promise<Trail> {
    const author = await this.usersRepository.findOneByOrFail({ id: userId });
    const trail = new Trail();
    trail.name = createTrailDto.name;
    trail.author = author;
    trail.description = createTrailDto.description;
    trail.location = createTrailDto.location;
    trail.latitude = createTrailDto.latitude;
    trail.longitude = createTrailDto.longitude;
    trail.difficulty = createTrailDto.difficulty;
    trail.length = createTrailDto.length;
    trail.estimatedTime = createTrailDto.estimatedTime;
    trail.typesAllowed = createTrailDto.typesAllowed;
    trail.Nodes = createTrailDto.Nodes;

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
      return await this.trailsRepository.findOneOrFail({
        where: { id: id },
        relations: ['author'],
      });
    } catch (error) {
      console.error('Error occurred while finding trail:', error);
      throw new Error('Failed to return trail.');
    }
  }

  async removeTrail(id: string): Promise<void> {
    // convert id parameter to a number
    const idNumber = parseInt(id, 10);

    // First Query: Find users with the specific trail
    const usersWithTrail = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoin('user.myTrails', 'trail')
      .where('trail.id = :id', { id })
      .getMany();

    // For each user, load complete myTrails and update
    for (const user of usersWithTrail) {
      // Load the complete myTrails collection
      const fullUser = await this.usersRepository.findOne({
        where: { id: user.id },
        relations: ['myTrails'],
      });
      // Filter out the specific trail
      fullUser.myTrails = fullUser.myTrails.filter((trail) => {
        return trail.id !== idNumber;
      });

      // Save the user
      await this.usersRepository.save(fullUser);
    }

    //then delete trail
    try {
      await this.trailsRepository.delete(id);
    } catch (error) {
      console.error('Error occured while removing trail:', error);
      throw new Error('Failed to delete trail');
    }
  }

  async getTrailsAndSaveToDatabase(): Promise<void> {
    const overpassUrl = 'http://overpass-api.de/api/interpreter';
    const overpassQuery = `
    [out:json];
    (
      area["ISO3166-1" = "US"][boundary = administrative];
      nwr["piste:grooming"](area);
    );
    out body;
    >;
    out skel qt;
    
      
    `;
    // [bbox:20,-130,51,-60]
    // [out:json];
    // (
    //   way["piste:grooming"];
    //   relation["piste:grooming"];
    // );
    // out body;
    // >;
    // out skel qt;
    try {
      const response = await axios.post(overpassUrl, overpassQuery, {
        timeout: 600000,
      });
      const data = response.data;

      if (!data || !data.elements) {
        console.error('Invalid Overpass data structure:', data);
        return;
      }

      const uniqueTrailNames = new Set<string>();
      const allowedGroomingTypes = new Set([
        'Classic',
        'Skate',
        'Skating',
        'Snowmobile',
      ]);

      // Iterate over each element in data.elements
      for (const element of data.elements) {
        if (element.nodes && element.tags && 'name' in element.tags) {
          const trailName = element.tags.name || 'Unnamed Trail';
          const groomingTag = element.tags['piste:grooming'];
          // Check if the trail name is already in the set
          if (uniqueTrailNames.has(trailName)) {
            continue; // Skip duplicate trail
          }

          uniqueTrailNames.add(trailName); // Add the trail name to the set

          const firstNodeId = element.nodes[0];
          const firstNodeCoordinates = this.getNodeCoordinates(
            data.elements,
            firstNodeId,
          );
          const groomingTypes = element.tags['piste:grooming']
            ? element.tags['piste:grooming']
                .split(/[+;]/)
                .map((type) => type.charAt(0).toUpperCase() + type.slice(1))
            : [];

          if (
            !groomingTypes ||
            !groomingTypes.some((type) => allowedGroomingTypes.has(type))
          ) {
            continue; // Skip trails with incorrect grooming types
          }
          const difficulty = element.tags['piste:difficulty']
            ? element.tags['piste:difficulty'].charAt(0).toUpperCase() +
              element.tags['piste:difficulty'].slice(1)
            : null;

          const trailToAdd: Trail = {
            name: trailName,
            description: element.tags.description || 'No Description',
            location: element.tags.location || 'N/A',
            latitude: firstNodeCoordinates ? firstNodeCoordinates[0] : null,
            longitude: firstNodeCoordinates ? firstNodeCoordinates[1] : null,
            difficulty: difficulty || 'Easy',
            length: element.tags.length || 1,
            estimatedTime: element.tags.estimatedTime || 60,
            typesAllowed: groomingTypes,
            Nodes: this.extractNodes(data.elements, element),
            id: 0,
            events: [],
          };

          if (firstNodeCoordinates) {
            const [latitude, longitude] = firstNodeCoordinates;

            const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.MAPSAPIKEY}`;
            const geocodingResponse = await axios.get(geocodingUrl);
            const address =
              geocodingResponse.data.results[0]?.formatted_address;
            trailToAdd.location = address || 'N/A';
          }

          // Add the trail to the database
          await this.createTrailInDatabase(trailToAdd);
        }
      }
    } catch (error) {
      console.error(`Error fetching Overpass data: ${error.message}`);
      throw error;
    }
  }

  private async createTrailInDatabase(trailToAdd: Trail): Promise<void> {
    try {
      await this.createTrail(trailToAdd, null);
    } catch (error) {
      console.error(
        'Error occurred while creating trail in the database:',
        error,
      );
      throw error;
    }
  }
  private extractNodes(elements: any[], trailElement: any): any[] {
    if (trailElement.type === 'relation') {
      return trailElement.members
        .filter((member: any) => member.type === 'way')
        .flatMap((member: any) => {
          const wayElement = this.findElementById(elements, member.ref);
          return wayElement ? this.extractNodes(elements, wayElement) : [];
        });
    } else if (trailElement.type === 'way') {
      return trailElement.nodes.map((nodeId: any) => ({
        id: nodeId,
        coordinates: this.getNodeCoordinates(elements, nodeId),
      }));
    }

    return [];
  }
  private getNodeCoordinates(elements: any[], nodeId: number): number[] | null {
    const nodeElement = this.findElementById(elements, nodeId);
    return nodeElement ? [nodeElement.lat, nodeElement.lon] : null;
  }

  private findElementById(elements: any[], id: number): any | null {
    return elements.find((element) => element.id === id) || null;
  }
}
