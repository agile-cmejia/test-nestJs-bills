import { Injectable } from '@nestjs/common';
import { CreateAppMenuItemActionDto } from './dto/create-app-menu-item-action.dto';
import { UpdateAppMenuItemActionDto } from './dto/update-app-menu-item-action.dto';

@Injectable()
export class AppMenuItemActionsService {
  create(createAppMenuItemActionDto: CreateAppMenuItemActionDto) {
    return 'This action adds a new appMenuItemAction';
  }

  findAll() {
    return `This action returns all appMenuItemActions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} appMenuItemAction`;
  }

  update(id: number, updateAppMenuItemActionDto: UpdateAppMenuItemActionDto) {
    return `This action updates a #${id} appMenuItemAction`;
  }

  remove(id: number) {
    return `This action removes a #${id} appMenuItemAction`;
  }
}
