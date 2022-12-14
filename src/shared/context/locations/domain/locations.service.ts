import { LocationType } from './../../location-types/infrastructure/entities/location-type.entity';
import { LocationTypeService } from './../../location-types/domain/location-type.service';
import { capitalizeSentence } from './../../../utils';
import { dbConfig } from '../../../infrastructure/persistance/postgre-sql/dbConfig';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from '../infrastructure/entities/locations.entity';
import { Repository } from 'typeorm';
import { FindLocationDto } from './dto/find-locations.dto';

@Injectable()
export class LocationService {
  private readonly logger = new Logger(LocationService.name);
  private locationCollection: Location[] = [];

  constructor(
    @InjectRepository(Location, dbConfig.name)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(LocationType, dbConfig.name)
    private readonly locationTypeService: LocationTypeService,
  ) {}

  async create(createLocationDto: CreateLocationDto) {
    this.logger.log('Creating new locations...');
    const { name, locationTypeId } = createLocationDto;

    const newLocation = this.locationRepository.create({
      ...createLocationDto,
      name: capitalizeSentence(name).trim(),
    });

    if (locationTypeId && locationTypeId > 0) {
      this.logger.log(`Looking for Location types ${locationTypeId}`);
      const locationType = await this.locationTypeService.findOne(locationTypeId);
      if (locationType) {
        this.logger.error(`The location type with id ${locationTypeId} was not found`);
        throw new NotFoundException('Location Type not found', {
          cause: new Error(),
          description: `The location type with id ${locationTypeId} was not found`,
        });
      }
      newLocation.locationType = locationType;
    }
    return await this.locationRepository.save(newLocation);
  }

  async findAll() {
    this.logger.log('Finding All location ...');
    this.locationCollection = await this.locationRepository
      .createQueryBuilder('locations')
      .leftJoinAndSelect('locations.locationType', 'locationType')
      .leftJoinAndSelect('locations.children', 'children')
      .leftJoinAndSelect('locations.parent', 'parent')
      .getMany();
    return this.locationCollection;
  }

  async findOne(id: number) {
    this.logger.log(`Searching for location  with id: ${id}.`);
    this.locationCollection = await this.locationRepository
      .createQueryBuilder('locations')
      .leftJoinAndSelect('locations.locationType', 'locationType')
      .leftJoinAndSelect('locations.children', 'children')
      .leftJoinAndSelect('locations.parent', 'parent')
      .andWhere('locations.id = :id ', { id })
      .getMany();
    if (this.locationCollection.length < 1) {
      this.logger.error(`The location with id ${id} was not found`);
      throw new NotFoundException('location  not found', {
        cause: new Error(),
        description: `The location with id ${id} was not found`,
      });
    }
    this.logger.log(`location with id: ${id} was found.`);
    return this.locationCollection[0];
  }

  async findByMany(findLocationDto: FindLocationDto) {
    const { ids, names, enabled, parentIds, locationTypeIds, childrenIds } = findLocationDto;
    let query = this.locationRepository
      .createQueryBuilder('locations')
      .leftJoinAndSelect('locations.locationType', 'locationType')
      .leftJoinAndSelect('locations.children', 'children')
      .leftJoinAndSelect('locations.parent', 'parent');

    if (ids && ids.length > 0) {
      this.logger.log(`Finding by ids: ${ids}`);
      query = query.andWhere('locations.id IN (:...ids) ', { ids });
    }
    if (names && names.length > 0) {
      this.logger.log(`Finding by names: ${names}`);
      query = query.andWhere('locations.name IN (:...names) ', {
        names: names.map((name) => capitalizeSentence(name)),
      });
    }
    if (parentIds && parentIds.length > 0) {
      this.logger.log(`Finding by parent Ids: ${parentIds}`);
      query = query.andWhere('parent.id IN (:...parentIds) ', { parentIds });
    }
    if (locationTypeIds && locationTypeIds.length > 0) {
      this.logger.log(`Finding by locationType Ids: ${locationTypeIds}`);
      query = query.andWhere('locationType.id IN (:...locationTypeIds) ', { locationTypeIds });
    }
    if (childrenIds && childrenIds.length > 0) {
      this.logger.log(`Finding by children Ids: ${childrenIds}`);
      query = query.andWhere('children.id IN (:...childrenIds) ', { childrenIds });
    }
    if (enabled != null) {
      this.logger.log(`Finding by enabled: ${enabled}`);
      query = query.andWhere('locations.enabled = :enabled ', { enabled });
    }

    this.locationCollection = await query.getMany();
    this.logger.log(`Found ${this.locationCollection.length} locations`);
    return this.locationCollection;
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    this.logger.log(`Updating for location with id: ${id}.`);
    const { name, locationTypeId } = updateLocationDto;

    const locationToUpdate = await this.locationRepository
      .createQueryBuilder('locations')
      .leftJoinAndSelect('locations.locationType', 'locationType')
      .leftJoinAndSelect('locations.children', 'children')
      .leftJoinAndSelect('locations.parent', 'parent')
      .andWhere('locations.id = :id ', { id })
      .getOne();
    if (!locationToUpdate) {
      this.logger.error(`The location with id ${id} was not found`);
      throw new NotFoundException('location not found', {
        cause: new Error(),
        description: `The location with id ${id} was not found`,
      });
    }

    this.locationRepository.merge(locationToUpdate, {
      ...updateLocationDto,
      name: capitalizeSentence(name).trim(),
    });

    if (locationTypeId && locationTypeId > 0) {
      this.logger.log(`Looking for Location types ${locationTypeId}`);
      const locationType = await this.locationTypeService.findOne(locationTypeId);
      if (locationType) {
        this.logger.error(`The location type with id ${locationTypeId} was not found`);
        throw new NotFoundException('Location Type not found', {
          cause: new Error(),
          description: `The location type with id ${locationTypeId} was not found`,
        });
      }
      locationToUpdate.locationType = locationType;
    }
    this.logger.log(`location with id: ${id} was updated.`);
    return await this.locationRepository.save(locationToUpdate);
  }

  async remove(id: number) {
    this.logger.log(`Enabling / Disabling location with id: ${id}.`);
    const locationToDisable = await this.locationRepository.findOneBy({ id });
    if (!locationToDisable) {
      this.logger.error(`The location with id ${id} was not found`);
      throw new NotFoundException('location not found', {
        cause: new Error(),
        description: `The location with id ${id} was not found`,
      });
    }
    locationToDisable.enabled = !locationToDisable.enabled;
    this.logger.log(`location with id: ${id} was ` + locationToDisable.enabled ? 'Enabled!' : 'Disabled!');

    return await this.locationRepository.save(locationToDisable);
  }
}
