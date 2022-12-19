import { PartialType } from '@nestjs/swagger';
import { CreateAppMenuItemActionDto } from './create-app-menu-item-action.dto';

export class UpdateAppMenuItemActionDto extends PartialType(CreateAppMenuItemActionDto) {}
