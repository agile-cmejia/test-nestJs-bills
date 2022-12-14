import { Tenant } from './../../tenants/infrastructure/entities/tenant.entity';
import { Location } from './../../locations/infrastructure/entities/locations.entity';
import { capitalizeSentence, fetchTenants } from './../../../utils';
import { dbConfig } from './../../../infrastructure/persistance/postgre-sql/dbConfig';
import { InjectRepository } from '@nestjs/typeorm';
import { CoverageZone } from './../infrastructure/entities/coverage-zone.entity';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCoverageZoneDto } from './dto/create-coverage-zone.dto';
import { UpdateCoverageZoneDto } from './dto/update-coverage-zone.dto';
import { Repository } from 'typeorm';
import { FindCoverageZoneDto } from './dto/find-coverage-zone.dto';
import { LocationService } from '../../locations/domain/locations.service';

@Injectable()
export class CoverageZoneService {
  private readonly logger = new Logger(CoverageZoneService.name);
  private coverageZoneCollection: CoverageZone[] = [];

  constructor(
    @InjectRepository(CoverageZone, dbConfig.name)
    private readonly coverageZoneRepository: Repository<CoverageZone>,
    //TODO: this should work right?
    @InjectRepository(Location, dbConfig.name)
    private readonly locationService: LocationService,
  ) {}

  async create(createCoverageZoneDto: CreateCoverageZoneDto) {
    this.logger.log('Creating new Coverage Zone...');
    const { name, description, tenantIds, locationIds } = createCoverageZoneDto;
    let foundTenants: Tenant[] = [];
    let locations: Location[] = [];

    if (tenantIds && tenantIds.length > 0) {
      this.logger.log(`looking for tenants with id:${tenantIds}`);
      foundTenants = await fetchTenants({ ids: tenantIds });
      if (foundTenants.length < 1) {
        this.logger.error(`The tenants with id ${tenantIds} were not found`);
        throw new NotFoundException('Tenants not found', {
          cause: new Error(),
          description: `The tenants with id ${tenantIds} were not found`,
        });
      }
    }
    if (locationIds && locationIds.length > 0) {
      this.logger.log(`Looking for Locations with ids: ${locationIds}`);

      locations = await this.locationService.findByMany({ ids: createCoverageZoneDto.locationIds });
      if (locations.length < 1) {
        this.logger.error(`The locations with id ${locationIds} were not found`);
        throw new NotFoundException('Location not found', {
          cause: new Error(),
          description: `The locations with id ${locationIds} were not found`,
        });
      }
    }
    const newCoverageZone = this.coverageZoneRepository.create({
      ...createCoverageZoneDto,
      name: capitalizeSentence(name).trim(),
      description: description.trim(),
      locations: locations.length > 0 ? locations : null,
      tenants: foundTenants,
    });
    return await this.coverageZoneRepository.save(newCoverageZone);
  }

  async findAll() {
    this.logger.log('Finding All Coverage Zones ...');
    this.coverageZoneCollection = await this.coverageZoneRepository
      .createQueryBuilder('CoverageZones')
      .leftJoinAndSelect('CoverageZones.tenants', 'tenants')
      .leftJoinAndSelect('CoverageZones.locations', 'locations')
      .getMany();
    this.logger.log(`Found ${this.coverageZoneCollection.length} Coverage Zones`);
    return this.coverageZoneCollection;
  }

  async findOne(id: number) {
    this.logger.log(`Finding Coverage Zone with id: ${id}...`);
    this.coverageZoneCollection = await this.coverageZoneRepository
      .createQueryBuilder('CoverageZones')
      .leftJoinAndSelect('CoverageZones.tenants', 'tenants')
      .leftJoinAndSelect('CoverageZones.locations', 'locations')
      .andWhere('CoverageZones.id = :id ', { id })
      .getMany();
    if (this.coverageZoneCollection.length < 1) {
      this.logger.error(`The Coverage Zone with id ${id} was not found`);
      throw new NotFoundException('Coverage Zone  not found', {
        cause: new Error(),
        description: `The Coverage Zone with id ${id} was not found`,
      });
    }
    this.logger.log(`Coverage Zone with id: ${id} was found.`);
    return this.coverageZoneCollection[0];
  }

  async findByMany(findCoverageZoneDto: FindCoverageZoneDto) {
    const { ids, names, descriptions, enabled, tenantIds, locationIds } = findCoverageZoneDto;
    let query = this.coverageZoneRepository
      .createQueryBuilder('CoverageZones')
      .leftJoinAndSelect('CoverageZones.tenants', 'tenants')
      .leftJoinAndSelect('CoverageZones.locations', 'locations');

    if (ids && ids.length > 0) {
      this.logger.log(`Finding by ids: ${ids}`);
      query = query.andWhere('CoverageZones.id IN (:...ids) ', { ids });
    }
    if (names && names.length > 0) {
      this.logger.log(`Finding by names: ${names}`);
      query = query.andWhere('CoverageZones.name IN (:...names) ', {
        names: names.map((name) => capitalizeSentence(name)),
      });
    }
    if (descriptions && descriptions.length > 0) {
      this.logger.log(`Finding by descriptions: ${descriptions}`);
      query = query.andWhere('CoverageZones.description IN (:...descriptions) ', { descriptions });
    }
    if (tenantIds && tenantIds.length > 0) {
      this.logger.log(`Finding by parent Ids: ${tenantIds}`);
      query = query.andWhere('tenants.id IN (:...tenantIds) ', { tenantIds });
    }
    if (locationIds && locationIds.length > 0) {
      this.logger.log(`Finding by Location Ids: ${locationIds}`);
      query = query.andWhere('locations.id IN (:...locationIds) ', { locationIds });
    }
    if (enabled != null) {
      this.logger.log(`Finding by enabled: ${enabled}`);
      query = query.andWhere('CoverageZones.enabled = :enabled ', { enabled });
    }

    this.coverageZoneCollection = await query.getMany();
    this.logger.log(`Found ${this.coverageZoneCollection.length} Coverage Zones`);
    return this.coverageZoneCollection;
  }

  async update(id: number, updateCoverageZoneDto: UpdateCoverageZoneDto) {
    this.logger.log(`Updating Coverage Zone with id: ${id}...`);
    const coverageZoneToUpdate = await this.coverageZoneRepository
      .createQueryBuilder('CoverageZones')
      .leftJoinAndSelect('CoverageZones.tenants', 'tenants')
      .leftJoinAndSelect('CoverageZones.locations', 'locations')
      .andWhere('CoverageZones.id = :id ', { id })
      .getOne();
    if (!coverageZoneToUpdate) {
      this.logger.error(`The Coverage Zone with id ${id} was not found`);
      throw new NotFoundException('Coverage Zone  not found', {
        cause: new Error(),
        description: `The Coverage Zone with id ${id} was not found`,
      });
    }
    const name = updateCoverageZoneDto.name || coverageZoneToUpdate.name;
    const enabled = updateCoverageZoneDto.enabled || coverageZoneToUpdate.enabled;
    const description = updateCoverageZoneDto.description || coverageZoneToUpdate.description;

    this.coverageZoneRepository.merge(coverageZoneToUpdate, {
      ...updateCoverageZoneDto,
      name: capitalizeSentence(name).trim(),
      description: description.trim(),
      enabled,
    });

    const tenantIds = updateCoverageZoneDto.tenantIds || null;
    let foundTenants: Tenant[] = [];
    if (tenantIds && tenantIds.length > 0) {
      this.logger.log(`looking for tenants with id:${tenantIds}`);
      foundTenants = await fetchTenants({ ids: tenantIds });
      if (foundTenants.length < 1) {
        this.logger.error(`The tenants with id ${tenantIds} were not found`);
        throw new NotFoundException('Tenants not found', {
          cause: new Error(),
          description: `The tenants with id ${tenantIds} were not found`,
        });
      }
      coverageZoneToUpdate.tenants = foundTenants;
    }

    const locationIds = updateCoverageZoneDto.locationIds || null;
    let locations: Location[] = [];
    if (locationIds && locationIds.length > 0) {
      this.logger.log(`Looking for Locations with ids: ${locationIds}`);
      locations = await this.locationService.findByMany({ ids: locationIds });
      if (locations.length < 1) {
        this.logger.error(`The locations with id ${locationIds} were not found`);
        throw new NotFoundException('Tenants not found', {
          cause: new Error(),
          description: `The locations with id ${locationIds} were not found`,
        });
      }
      coverageZoneToUpdate.locations = locations;
    }

    this.logger.log(`Coverage Zone with id: ${id} was updated.`);
    return await this.coverageZoneRepository.save(coverageZoneToUpdate);
  }

  async remove(id: number) {
    this.logger.log(`Enabling / Disabling Coverage Zone with id: ${id}...`);
    const CoverageZoneToDisable = await this.coverageZoneRepository
      .createQueryBuilder('CoverageZones')
      .leftJoinAndSelect('CoverageZones.tenants', 'tenants')
      .leftJoinAndSelect('CoverageZones.locations', 'locations')
      .andWhere('CoverageZones.id = :id ', { id })
      .getOne();
    if (!CoverageZoneToDisable) {
      this.logger.error(`The Coverage Zone with id ${id} was not found`);
      throw new NotFoundException('Coverage Zone  not found', {
        cause: new Error(),
        description: `The Coverage Zone with id ${id} was not found`,
      });
    }

    CoverageZoneToDisable.enabled = !CoverageZoneToDisable.enabled;
    this.logger.log(`Coverage Zone with id: ${id} was ` + CoverageZoneToDisable.enabled ? 'Enabled!' : 'Disabled!');

    return await this.coverageZoneRepository.save(CoverageZoneToDisable);
  }
}
