import { FindAppMenuItemDto } from './dto/find-app-menu-item.dto';
import { capitalizeSentence } from './../../../utils';
import { AppSectionsService } from './../../app-sections/domain/app-sections.service';
import { dbConfig } from './../../../infrastructure/persistance/postgre-sql/dbConfig';
import { AppMenuItem } from '../infrastructure/entities/app-menu-item.entity';
import { Injectable, Logger, forwardRef, Inject, NotFoundException } from '@nestjs/common';
import { CreateAppMenuItemDto } from './dto/create-app-menu-item.dto';
import { UpdateAppMenuItemDto } from './dto/update-app-menu-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppMenuItemsService {
  private readonly logger = new Logger(AppMenuItemsService.name);
  private AppMenuItemCollection: AppMenuItem[] = [];

  constructor(
    @InjectRepository(AppMenuItem, dbConfig.name)
    private readonly AppMenuItemRepository: Repository<AppMenuItem>,

    @Inject(forwardRef(() => AppSectionsService))
    private readonly appSectionsService: AppSectionsService,
  ) {}

  async create(createAppMenuItemDto: CreateAppMenuItemDto) {
    this.logger.log('Creating new App Section...');
    const { name, route, recordTypeId, appSectionIds } = createAppMenuItemDto;

    const newAppMenuItem = this.AppMenuItemRepository.create({
      ...createAppMenuItemDto,
      name: capitalizeSentence(name).trim(),
      route: route.trim().toLowerCase(),
    });

    newAppMenuItem.appSections = await this.appSectionsService.findByMany({ ids: appSectionIds });

    //TODO: Implement App Sections Ids
    if (recordTypeId) {
      this.logger.log(`menu Item Ids: ${recordTypeId}`);
    }

    return await this.AppMenuItemRepository.save(newAppMenuItem);
  }

  async findAll() {
    this.logger.log('Finding All App Sections ...');
    this.AppMenuItemCollection = await this.AppMenuItemRepository.createQueryBuilder('MenuItems')
      .leftJoinAndSelect('MenuItems.appSection', 'appSection')
      .leftJoinAndSelect('MenuItems.recordType', 'recordType')
      .getMany();
    this.logger.log(`Found ${this.AppMenuItemCollection.length} App Sections`);
    return this.AppMenuItemCollection;
  }

  async findOne(id: number) {
    this.logger.log(`Searching for App Section  with id: ${id}.`);
    this.AppMenuItemCollection = await this.AppMenuItemRepository.createQueryBuilder('MenuItems')
      .leftJoinAndSelect('MenuItems.appSection', 'appSection')
      .leftJoinAndSelect('MenuItems.recordType', 'recordType')
      .andWhere('MenuItems.id = :id ', { id })
      .getMany();
    if (this.AppMenuItemCollection.length < 1) {
      this.logger.error(`The App Section with id ${id} was not found`);
      throw new NotFoundException('App Section not found', {
        cause: new Error(),
        description: `The App Section with id ${id} was not found`,
      });
    }
    this.logger.log(`App Section with id: ${id} was found.`);
    return this.AppMenuItemCollection[0];
  }

  async findByMany(findAppMenuItemDto: FindAppMenuItemDto) {
    const { ids, names, enabled, routes, appSectionIds, recordTypeIds, hasRecordTypes } = findAppMenuItemDto;
    let query = this.AppMenuItemRepository.createQueryBuilder('AppSections').leftJoinAndSelect(
      'AppSections.appModule',
      'AppModule',
    );
    //.leftJoinAndSelect('AppSections.menuItems', 'menuItems')
    //.leftJoinAndSelect('menuItems.recordType', 'recordType');

    if (ids && ids.length > 0) {
      this.logger.log(`Finding by ids: ${ids}`);
      query = query.andWhere('AppSections.id IN (:...ids) ', { ids });
    }
    if (names && names.length > 0) {
      this.logger.log(`Finding by names: ${names}`);
      query = query.andWhere('AppSections.name IN (:...names) ', {
        names: names.map((name) => capitalizeSentence(name)),
      });
    }
    if (routes && routes.length > 0) {
      this.logger.log(`Finding by routes: ${routes}`);
      query = query.andWhere('AppSections.route IN (:...routes) ', {
        routes: routes.map((url) => capitalizeSentence(url)),
      });
    }
    if (appSectionIds && appSectionIds.length > 0) {
      this.logger.log(`Finding by App Modules Ids: ${appSectionIds}`);
      query = query.andWhere('AppModule.id IN (:...appSectionIds) ', { appSectionIds });
    }
    if (recordTypeIds && recordTypeIds.length > 0) {
      this.logger.log(`Finding by App Modules Ids: ${recordTypeIds}`);
      query = query.andWhere('menuItems.id IN (:...recordTypeIds) ', { recordTypeIds });
    }
    if (enabled != null) {
      this.logger.log(`Finding by enabled: ${enabled}`);
      query = query.andWhere('AppSections.enabled = :enabled ', { enabled });
    }
    if (hasRecordTypes != null) {
      this.logger.log(`Finding by hasRecordTypes: ${enabled}`);
      query = query.andWhere('AppSections.hasRecordTypes = :hasRecordTypes ', { hasRecordTypes });
    }

    this.AppMenuItemCollection = await query.getMany();
    this.logger.log(`Found ${this.AppMenuItemCollection.length} App Sections`);
    return this.AppMenuItemCollection;
  }

  async update(id: number, updateAppMenuItemDto: UpdateAppMenuItemDto) {
    const appSectionToUpdate = await this.findOne(id);
    this.logger.log(`Updating App Module with id: ${id}.`);

    const { appSectionIds, recordTypeId } = updateAppMenuItemDto;
    const name = updateAppMenuItemDto.name || appSectionToUpdate.name;
    const route = updateAppMenuItemDto.route || appSectionToUpdate.route;

    if (appSectionIds)
      appSectionToUpdate.appSections = await this.appSectionsService.findByMany({ ids: appSectionIds });

    this.AppMenuItemRepository.merge(appSectionToUpdate, {
      name: capitalizeSentence(name).trim(),
      route: route.toLowerCase().trim(),
      ...updateAppMenuItemDto,
    });

    //TODO: Implement App Sections Ids
    if (recordTypeId) {
      this.logger.log(`App Modules types: ${recordTypeId}`);
    }
    return this.AppMenuItemRepository.save(appSectionToUpdate);
  }

  async remove(id: number) {
    const appModuleToDisable = await this.findOne(id);
    appModuleToDisable.enabled = !appModuleToDisable.enabled;
    this.logger.log(`AppModule with id: ${id} was ` + appModuleToDisable.enabled ? 'Enabled!' : 'Disabled!');
    return await this.AppMenuItemRepository.save(appModuleToDisable);
  }
}
