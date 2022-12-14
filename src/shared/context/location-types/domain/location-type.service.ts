import { Location } from './../../locations/infrastructure/entities/locations.entity';
import { LocationService } from './../../locations/domain/locations.service';
import { FindLocationTypeDto } from './dto/find-location-types.dto';
import { capitalizeSentence } from './../../../utils';
import { LocationType } from '../infrastructure/entities/location-type.entity';
import { dbConfig } from './../../../infrastructure/persistance/postgre-sql/dbConfig';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateLocationTypeDto } from './dto/create-location-types.dto';
import { UpdateLocationTypeDto } from './dto/update-location-types.dto';
import { Repository } from 'typeorm';

@Injectable()
export class LocationTypeService {
  private readonly logger = new Logger(LocationTypeService.name);
  private locationTypeCollection: LocationType[] = [];

  constructor(
    @InjectRepository(LocationType, dbConfig.name)
    private readonly locationTypeRepository: Repository<LocationType>,
    @InjectRepository(Location, dbConfig.name)
    private readonly locationService: LocationService,
  ) {}

  async create(createLocationTypeDto: CreateLocationTypeDto) {
    this.logger.log('Creating new Location Type...');
    const { name, description, childrenIds, parentId, locationIds } = createLocationTypeDto;

    const newLocationType = this.locationTypeRepository.create({
      ...createLocationTypeDto,
      name: capitalizeSentence(name).trim(),
      description: description.trim(),
    });

    if (childrenIds && childrenIds.length > 0) {
      const childrenTenantTypes = await this.findByMany({ ids: childrenIds });
      if (childrenTenantTypes.length < 1) {
        this.logger.error(`The locations types with ids: ${locationIds} were not found`);
        throw new NotFoundException('Location types not found', {
          cause: new Error(),
          description: `The locations types with ids: ${locationIds} were not found`,
        });
      }
      newLocationType.children = childrenTenantTypes;
    }

    if (parentId) {
      const parentTenantType = await this.findOne(parentId);
      if (parentTenantType) {
        this.logger.error(`The locations type with ids: ${parentId} was not found`);
        throw new NotFoundException('Location types not found', {
          cause: new Error(),
          description: `The locations types with ids: ${parentId} was not found`,
        });
      }
      newLocationType.parent = parentTenantType;
    }

    if (locationIds && locationIds.length > 0) {
      this.logger.log(`Looking for Locations with ids: ${locationIds}`);
      const locations = await this.locationService.findByMany({ ids: locationIds });
      if (locations.length < 1) {
        this.logger.error(`The locations with id: ${locationIds} were not found`);
        throw new NotFoundException('Locations not found', {
          cause: new Error(),
          description: `The locations with ids: ${locationIds} were not found`,
        });
      }
      newLocationType.locations = locations;
    }

    return await this.locationTypeRepository.save(newLocationType);
  }

  async findAll() {
    this.logger.log('Finding All Location Types ...');
    this.locationTypeCollection = await this.locationTypeRepository
      .createQueryBuilder('LocationTypes')
      .leftJoinAndSelect('LocationTypes.children', 'children')
      .leftJoinAndSelect('LocationTypes.parent', 'parent')
      .leftJoinAndSelect('LocationTypes.locations', 'locations')
      .getMany();
    this.logger.log(`Found ${this.locationTypeCollection.length} Location Types`);
    return this.locationTypeCollection;
  }

  async findOne(id: number) {
    this.logger.log(`Finding Location type with id: ${id}...`);
    this.locationTypeCollection = await this.locationTypeRepository
      .createQueryBuilder('LocationTypes')
      .leftJoinAndSelect('LocationTypes.children', 'children')
      .leftJoinAndSelect('LocationTypes.parent', 'parent')
      .leftJoinAndSelect('LocationTypes.locations', 'locations')
      .andWhere('LocationTypes.id = :id ', { id })
      .getMany();
    if (this.locationTypeCollection.length < 1) {
      this.logger.error(`The Location type with id ${id} was not found`);
      throw new NotFoundException('Location type  not found', {
        cause: new Error(),
        description: `The Location type with id ${id} was not found`,
      });
    }
    this.logger.log(`Location type with id: ${id} was found.`);
    return this.locationTypeCollection[0];
  }

  async findByMany(findTenantDto: FindLocationTypeDto) {
    const { ids, names, descriptions, enabled, parentIds, childrenIds, locationIds } = findTenantDto;
    let query = this.locationTypeRepository
      .createQueryBuilder('LocationTypes')
      .leftJoinAndSelect('LocationTypes.children', 'children')
      .leftJoinAndSelect('LocationTypes.parent', 'parent')
      .leftJoinAndSelect('LocationTypes.locations', 'locations');

    if (ids && ids.length > 0) {
      this.logger.log(`Finding by ids: ${ids}`);
      query = query.andWhere('LocationTypes.id IN (:...ids) ', { ids });
    }
    if (names && names.length > 0) {
      this.logger.log(`Finding by names: ${names}`);
      query = query.andWhere('LocationTypes.name IN (:...names) ', {
        names: names.map((name) => capitalizeSentence(name)),
      });
    }
    if (descriptions && descriptions.length > 0) {
      this.logger.log(`Finding by descriptions: ${descriptions}`);
      query = query.andWhere('LocationTypes.description IN (:...descriptions) ', { descriptions });
    }
    if (parentIds && parentIds.length > 0) {
      this.logger.log(`Finding by parent Ids: ${parentIds}`);
      query = query.andWhere('parent.id IN (:...parentIds) ', { parentIds });
    }
    if (locationIds && locationIds.length > 0) {
      this.logger.log(`Finding by roleAliases Ids: ${locationIds}`);
      query = query.andWhere('locations.id IN (:...locationIds) ', { locationIds });
    }
    if (childrenIds && childrenIds.length > 0) {
      this.logger.log(`Finding by children Ids: ${childrenIds}`);
      query = query.andWhere('children.id IN (:...childrenIds) ', { childrenIds });
    }
    if (enabled != null) {
      this.logger.log(`Finding by enabled: ${enabled}`);
      query = query.andWhere('LocationTypes.enabled = :enabled ', { enabled });
    }

    this.locationTypeCollection = await query.getMany();
    this.logger.log(`Found ${this.locationTypeCollection.length} Location Types`);
    return this.locationTypeCollection;
  }

  async update(id: number, updateLocationTypeDto: UpdateLocationTypeDto) {
    this.logger.log(`Updating Location type with id: ${id}...`);
    const locationTypeToUpdate = await this.locationTypeRepository
      .createQueryBuilder('LocationTypes')
      .leftJoinAndSelect('LocationTypes.children', 'children')
      .leftJoinAndSelect('LocationTypes.parent', 'parent')
      .leftJoinAndSelect('LocationTypes.locations', 'locations')
      .andWhere('LocationTypes.id = :id ', { id })
      .getOne();
    if (!locationTypeToUpdate) {
      this.logger.error(`The Location type with id ${id} was not found`);
      throw new NotFoundException('Location type  not found', {
        cause: new Error(),
        description: `The Location type with id ${id} was not found`,
      });
    }
    const name = updateLocationTypeDto.name || locationTypeToUpdate.name;
    const enabled = updateLocationTypeDto.enabled || locationTypeToUpdate.enabled;
    const description = updateLocationTypeDto.description || locationTypeToUpdate.description;
    const { childrenIds, parentId, locationIds } = updateLocationTypeDto;

    if (childrenIds && childrenIds.length > 0) {
      const childrenTenantTypes = await this.findByMany({ ids: childrenIds });
      if (childrenTenantTypes.length < 1) {
        this.logger.error(`The locations types with ids: ${locationIds} were not found`);
        throw new NotFoundException('Location types not found', {
          cause: new Error(),
          description: `The locations types with ids: ${locationIds} were not found`,
        });
      }
      locationTypeToUpdate.children = childrenTenantTypes;
    }

    if (parentId) {
      const parentTenantType = await this.findOne(parentId);
      if (parentTenantType) {
        this.logger.error(`The locations type with ids: ${parentId} was not found`);
        throw new NotFoundException('Location types not found', {
          cause: new Error(),
          description: `The locations types with ids: ${parentId} was not found`,
        });
      }
      locationTypeToUpdate.parent = parentTenantType;
    }

    if (locationIds && locationIds.length > 0) {
      this.logger.log(`Looking for Locations with ids: ${locationIds}`);
      const locations = await this.locationService.findByMany({ ids: locationIds });
      if (locations.length < 1) {
        this.logger.error(`The locations with id: ${locationIds} were not found`);
        throw new NotFoundException('Locations not found', {
          cause: new Error(),
          description: `The locations with ids: ${locationIds} were not found`,
        });
      }
      locationTypeToUpdate.locations = locations;
    }

    this.locationTypeRepository.merge(locationTypeToUpdate, {
      ...updateLocationTypeDto,
      name: capitalizeSentence(name).trim(),
      description: description.trim(),
      enabled,
    });
    this.logger.log(`Location Type with id: ${id} was updated.`);
    return await this.locationTypeRepository.save(locationTypeToUpdate);
  }

  async remove(id: number) {
    this.logger.log(`Enabling / Disabling Location type with id: ${id}...`);
    const locationTypeToDisable = await this.locationTypeRepository
      .createQueryBuilder('LocationTypes')
      .leftJoinAndSelect('LocationTypes.children', 'children')
      .leftJoinAndSelect('LocationTypes.parent', 'parent')
      .leftJoinAndSelect('LocationTypes.locations', 'locations')
      .andWhere('LocationTypes.id = :id ', { id })
      .getOne();
    if (!locationTypeToDisable) {
      this.logger.error(`The Location type with id ${id} was not found`);
      throw new NotFoundException('Location type  not found', {
        cause: new Error(),
        description: `The Location type with id ${id} was not found`,
      });
    }

    locationTypeToDisable.enabled = !locationTypeToDisable.enabled;
    this.logger.log(`Location Type with id: ${id} was ` + locationTypeToDisable.enabled ? 'Enabled!' : 'Disabled!');

    return await this.locationTypeRepository.save(locationTypeToDisable);
  }
}
