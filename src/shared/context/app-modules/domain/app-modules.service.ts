import { capitalizeSentence } from './../../../utils';
import { dbConfig } from './../../../infrastructure/persistance/postgre-sql/dbConfig';
import { ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppModule } from '../infrastructure/entities/app-module.entity';
import { UpdateAppModuleDto } from './dto/update-app-module.dto';
import { CreateAppModuleDto } from './dto/create-app-module.dto';
import { FindAppModuleDto } from './dto/find-app-module.dto';
import { Repository } from 'typeorm';

@Injectable()
export class AppModulesService {
  private readonly logger = new Logger(AppModulesService.name);
  private AppModuleCollection: AppModule[] = [];

  constructor(
    @InjectRepository(AppModule, dbConfig.name)
    private readonly AppModuleRepository: Repository<AppModule>,
  ) {}

  async create(createAppModuleDto: CreateAppModuleDto) {
    this.logger.log('Creating new App Module...');
    const { tag, name, route, appSectionIds } = createAppModuleDto;
    const existingAppModuleTag = await this.AppModuleRepository.findOneBy({ tag: tag.toLowerCase().trim() });
    if (existingAppModuleTag) {
      this.logger.error(`The tag "${tag}" is already used and needs to be unique`);
      throw new ForbiddenException('tag is already in use', {
        cause: new Error(),
        description: `The tag "${tag}" is already used and needs to be unique`,
      });
    }

    const newAppModule = this.AppModuleRepository.create({
      ...createAppModuleDto,
      name: capitalizeSentence(name).trim(),
      tag: tag.trim().toLowerCase(),
      route: route.trim(),
    });

    //TODO: Implement App Sections Ids
    if (appSectionIds && appSectionIds.length > 0) {
      this.logger.log(`App Modules types: ${appSectionIds}`);
    }

    return await this.AppModuleRepository.save(newAppModule);
  }

  async findAll() {
    this.logger.log('Finding All App Modules ...');
    this.AppModuleCollection = await this.AppModuleRepository.createQueryBuilder('AppModule')
      .leftJoinAndSelect('AppModule.appSections', 'AppSections')
      //.leftJoinAndSelect('AppSections.menuItems', 'menuItems')
      //.leftJoinAndSelect('menuItems.recordType', 'recordType')
      .getMany();
    return this.AppModuleCollection;
  }

  async findOne(id: number) {
    this.logger.log(`Searching for App Module  with id: ${id}.`);
    this.AppModuleCollection = await this.AppModuleRepository.createQueryBuilder('AppModule')
      .leftJoinAndSelect('AppModule.appSections', 'AppSections')
      //.leftJoinAndSelect('AppSections.menuItems', 'menuItems')
      //.leftJoinAndSelect('menuItems.recordType', 'recordType')
      .andWhere('AppModule.id = :id ', { id })
      .getMany();
    if (this.AppModuleCollection.length < 1) {
      this.logger.error(`The App Module with id ${id} was not found`);
      throw new NotFoundException('App Module  not found', {
        cause: new Error(),
        description: `The App Module with id ${id} was not found`,
      });
    }
    this.logger.log(`App Module with id: ${id} was found.`);
    return this.AppModuleCollection[0];
  }

  async findByMany(findAppModuleDto: FindAppModuleDto) {
    const { ids, names, enabled, tags, routes, orders, application, appSectionIds } = findAppModuleDto;
    let query = this.AppModuleRepository.createQueryBuilder('AppModule').leftJoinAndSelect(
      'AppModule.appSections',
      'AppSections',
    );
    //.leftJoinAndSelect('AppSections.menuItems', 'menuItems')
    //.leftJoinAndSelect('menuItems.recordType', 'recordType');

    if (ids && ids.length > 0) {
      this.logger.log(`Finding by ids: ${ids}`);
      query = query.andWhere('AppModule.id IN (:...ids) ', { ids });
    }
    if (names && names.length > 0) {
      this.logger.log(`Finding by names: ${names}`);
      query = query.andWhere('AppModule.name IN (:...names) ', {
        names: names.map((name) => capitalizeSentence(name)),
      });
    }
    if (tags && tags.length > 0) {
      this.logger.log(`Finding by tags: ${tags}`);
      query = query.andWhere('AppModule.tag IN (:...tags) ', { tags: tags.map((url) => capitalizeSentence(url)) });
    }
    if (routes && routes.length > 0) {
      this.logger.log(`Finding by routes: ${routes}`);
      query = query.andWhere('AppModule.route IN (:...routes) ', {
        routes: routes.map((url) => capitalizeSentence(url)),
      });
    }
    if (orders && orders.length > 0) {
      this.logger.log(`Finding by parent Ids: ${orders}`);
      query = query.andWhere('AppModule.order IN (:...orders) ', { orders });
    }
    if (appSectionIds && appSectionIds.length > 0) {
      this.logger.log(`Finding by roleAliases Ids: ${appSectionIds}`);
      query = query.andWhere('AppSections.id IN (:...appSectionIds) ', { appSectionIds });
    }
    if (application) {
      this.logger.log(`Finding by application: ${application}`);
      query = query.andWhere('AppSections.application = :application ', { application });
    }
    if (enabled != null) {
      this.logger.log(`Finding by enabled: ${enabled}`);
      query = query.andWhere('AppModule.enabled = :enabled ', { enabled });
    }

    this.AppModuleCollection = await query.getMany();
    this.logger.log(`Found ${this.AppModuleCollection.length} AppModule`);
    return this.AppModuleCollection;
  }

  async update(id: number, updateAppModuleDto: UpdateAppModuleDto) {
    const appModuleToUpdate = await this.findOne(id);
    this.logger.log(`Updating App Module with id: ${id}.`);

    const { tag, appSectionIds } = updateAppModuleDto;
    const name = updateAppModuleDto.name || appModuleToUpdate.name;
    const route = updateAppModuleDto.route || appModuleToUpdate.route;

    if (tag && tag != appModuleToUpdate.tag) {
      this.logger.log(`Searching to another module with tag : ${tag}.`);
      const existingAppModuleTag = await this.AppModuleRepository.findOneBy({ tag: tag.toLowerCase().trim() });
      if (existingAppModuleTag && existingAppModuleTag.id != id) {
        this.logger.error(`The tag "${tag}" is already used and needs to be unique`);
        throw new ForbiddenException('tag is already in use', {
          cause: new Error(),
          description: `The tag "${tag}" is already used and needs to be unique`,
        });
      }
      appModuleToUpdate.tag = tag.toLowerCase().trim();
    }

    this.AppModuleRepository.merge(appModuleToUpdate, {
      name: capitalizeSentence(name).trim(),
      route: route.toLowerCase().trim(),
      ...updateAppModuleDto,
    });

    //TODO: Implement App Sections Ids
    if (appSectionIds && appSectionIds.length > 0) {
      this.logger.log(`App Modules types: ${appSectionIds}`);
    }
    return this.AppModuleRepository.save(appModuleToUpdate);
  }

  async remove(id: number) {
    this.logger.log(`Enabling / Disabling AppModule with id: ${id}.`);
    const appModuleToDisable = await this.findOne(id);
    appModuleToDisable.enabled = !appModuleToDisable.enabled;
    this.logger.log(`AppModule with id: ${id} was ` + appModuleToDisable.enabled ? 'Enabled!' : 'Disabled!');
    return await this.AppModuleRepository.save(appModuleToDisable);
  }
}
