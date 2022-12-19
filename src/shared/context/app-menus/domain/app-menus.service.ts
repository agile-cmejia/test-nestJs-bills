import { AppMenu } from '../../app-menus/infrastructure/entities/app-menu.entity';
import { Injectable, Logger } from '@nestjs/common';
import { CreateAppMenuDto } from './dto/create-app-menu.dto';
import { UpdateAppMenuDto } from './dto/update-app-menu.dto';

@Injectable()
export class AppMenusService {
  private readonly logger = new Logger(AppMenusService.name);
  private AppMenuCollection: AppMenu[] = [];

  async create(createAppMenuDto: CreateAppMenuDto) {
    return 'This action adds a new appMenu';
  }

  async findAll() {
    return `This action returns all appMenus`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} appMenu`;
  }

  async update(id: number, updateAppMenuDto: UpdateAppMenuDto) {
    return `This action updates a #${id} appMenu`;
  }

  async remove(id: number) {
    return `This action removes a #${id} appMenu`;
  }
}
