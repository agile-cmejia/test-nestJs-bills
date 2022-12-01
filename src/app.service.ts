import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getHello() {
    this.logger.log(`${AppService.name} called function ${this.getHello.name}`);
    return { message: `Service ${AppService.name} working !!` };
  }
}
