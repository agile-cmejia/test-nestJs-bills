import { FindAppSectionDto } from './dto/find-app-section.dto';
import { AppModulesService } from './../../app-modules/domain/app-modules.service';
import { capitalizeSentence } from './../../../utils';
import { dbConfig } from '../../../infrastructure/persistance/postgre-sql/dbConfig';
import { AppSection } from './../infrastructure/entities/app-section.entity';
import { Injectable, Logger, ForbiddenException, Inject, forwardRef, NotFoundException } from '@nestjs/common';
import { CreateAppSectionDto } from './dto/create-app-section.dto';
import { UpdateAppSectionDto } from './dto/update-app-section.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppSectionsService {
  private readonly logger = new Logger(AppSectionsService.name);
  private appSectionCollection: AppSection[] = [];

  constructor(
    @InjectRepository(AppSection, dbConfig.name)
    private readonly AppSectionRepository: Repository<AppSection>,

    @Inject(forwardRef(() => AppModulesService))
    private readonly appModuleService: AppModulesService,
  ) {}

  async create(createAppSectionDto: CreateAppSectionDto) {
    this.logger.log('Creating new App Section...');
    const { tag, name, route, menuItemIds, appModuleId } = createAppSectionDto;

    const existingAppSectionTag = await this.AppSectionRepository.findOneBy({ tag: tag.toLowerCase().trim() });
    if (existingAppSectionTag) {
      this.logger.error(`The tag "${tag}" is already used and needs to be unique`);
      throw new ForbiddenException('tag is already in use', {
        cause: new Error(),
        description: `The tag "${tag}" is already used and needs to be unique`,
      });
    }

    const newAppSection = this.AppSectionRepository.create({
      ...createAppSectionDto,
      name: capitalizeSentence(name).trim(),
      tag: tag.trim().toLowerCase(),
      route: route.trim(),
    });

    newAppSection.appModule = await this.appModuleService.findOne(appModuleId);

    //TODO: Implement App Sections Ids
    if (menuItemIds && menuItemIds.length > 0) {
      this.logger.log(`menu Item Ids: ${menuItemIds}`);
    }

    return await this.AppSectionRepository.save(newAppSection);
  }

  async findAll() {
    this.logger.log('Finding All App Sections ...');
    this.appSectionCollection = await this.AppSectionRepository.createQueryBuilder('AppSections')
      .leftJoinAndSelect('AppSections.appModule', 'AppSections')
      //.leftJoinAndSelect('AppSections.menuItems', 'menuItems')
      //.leftJoinAndSelect('menuItems.recordType', 'recordType')
      .getMany();
    this.logger.log(`Found ${this.appSectionCollection.length} App Sections`);
    return this.appSectionCollection;
  }

  async findOne(id: number) {
    this.logger.log(`Searching for App Section  with id: ${id}.`);
    this.appSectionCollection = await this.AppSectionRepository.createQueryBuilder('AppSections')
      .leftJoinAndSelect('AppSections.appModule', 'AppSections')
      //.leftJoinAndSelect('AppSections.menuItems', 'menuItems')
      //.leftJoinAndSelect('menuItems.recordType', 'recordType')
      //.leftJoinAndSelect('menuItems.recordType', 'recordType')
      .andWhere('AppSections.id = :id ', { id })
      .getMany();
    if (this.appSectionCollection.length < 1) {
      this.logger.error(`The App Section with id ${id} was not found`);
      throw new NotFoundException('App Section not found', {
        cause: new Error(),
        description: `The App Section with id ${id} was not found`,
      });
    }
    this.logger.log(`App Section with id: ${id} was found.`);
    return this.appSectionCollection[0];
  }

  async findByMany(FindAppSectionDto: FindAppSectionDto) {
    const { ids, names, enabled, tags, routes, orders, appModuleIds, menuItemIds } = FindAppSectionDto;
    let query = this.AppSectionRepository.createQueryBuilder('AppSections').leftJoinAndSelect(
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
    if (tags && tags.length > 0) {
      this.logger.log(`Finding by tags: ${tags}`);
      query = query.andWhere('AppSections.tag IN (:...tags) ', { tags: tags.map((url) => capitalizeSentence(url)) });
    }
    if (routes && routes.length > 0) {
      this.logger.log(`Finding by routes: ${routes}`);
      query = query.andWhere('AppSections.route IN (:...routes) ', {
        routes: routes.map((url) => capitalizeSentence(url)),
      });
    }
    if (orders && orders.length > 0) {
      this.logger.log(`Finding by parent Ids: ${orders}`);
      query = query.andWhere('AppSections.order IN (:...orders) ', { orders });
    }
    if (appModuleIds && appModuleIds.length > 0) {
      this.logger.log(`Finding by App Modules Ids: ${appModuleIds}`);
      query = query.andWhere('AppModule.id IN (:...appModuleIds) ', { appModuleIds });
    }
    if (menuItemIds && menuItemIds.length > 0) {
      this.logger.log(`Finding by App Modules Ids: ${menuItemIds}`);
      query = query.andWhere('menuItems.id IN (:...menuItemIds) ', { menuItemIds });
    }

    if (enabled != null) {
      this.logger.log(`Finding by enabled: ${enabled}`);
      query = query.andWhere('AppSections.enabled = :enabled ', { enabled });
    }

    this.appSectionCollection = await query.getMany();
    this.logger.log(`Found ${this.appSectionCollection.length} App Sections`);
    return this.appSectionCollection;
  }

  async update(id: number, updateAppSectionDto: UpdateAppSectionDto) {
    const appSectionToUpdate = await this.findOne(id);
    this.logger.log(`Updating App Module with id: ${id}.`);

    const { tag, appModuleId, menuItemIds } = updateAppSectionDto;
    const name = updateAppSectionDto.name || appSectionToUpdate.name;
    const route = updateAppSectionDto.route || appSectionToUpdate.route;

    if (tag && tag != appSectionToUpdate.tag) {
      this.logger.log(`Searching to another module with tag : ${tag}.`);
      const existingAppModuleTag = await this.AppSectionRepository.findOneBy({ tag: tag.toLowerCase().trim() });
      if (existingAppModuleTag && existingAppModuleTag.id != id) {
        this.logger.error(`The tag "${tag}" is already used and needs to be unique`);
        throw new ForbiddenException('tag is already in use', {
          cause: new Error(),
          description: `The tag "${tag}" is already used and needs to be unique`,
        });
      }
      appSectionToUpdate.tag = tag.toLowerCase().trim();
    }

    if (appModuleId) appSectionToUpdate.appModule = await this.appModuleService.findOne(appModuleId);

    this.AppSectionRepository.merge(appSectionToUpdate, {
      name: capitalizeSentence(name).trim(),
      route: route.toLowerCase().trim(),
      ...updateAppSectionDto,
    });

    //TODO: Implement App Sections Ids
    if (menuItemIds && menuItemIds.length > 0) {
      this.logger.log(`App Modules types: ${menuItemIds}`);
    }
    return this.AppSectionRepository.save(appSectionToUpdate);
  }

  async remove(id: number) {
    const appModuleToDisable = await this.findOne(id);
    appModuleToDisable.enabled = !appModuleToDisable.enabled;
    this.logger.log(`AppModule with id: ${id} was ` + appModuleToDisable.enabled ? 'Enabled!' : 'Disabled!');
    return await this.AppSectionRepository.save(appModuleToDisable);
  }
}
