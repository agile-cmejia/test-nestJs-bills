import { Module } from '@nestjs/common';
import { BillsController } from './bills.controller';
import { BillsService } from '../../shared/context/bills/bills.service';

@Module({
  controllers: [BillsController],
  providers: [BillsService],
  exports: [BillsService],
})
export class BillsModule {}
