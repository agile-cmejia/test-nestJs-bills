import { Module } from '@nestjs/common';
// Note: The following imports will be needed once Bill entity is available in @avantodev/avanto-db
// See docs/database-requests/2026-02-02-add-bill-entity.md for entity requirements
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Bill } from '@avantodev/avanto-db';
// TODO: Install @nestjs/axios package: yarn add @nestjs/axios
// import { HttpModule } from '@nestjs/axios';
// TODO: Install @nestjs/config package: yarn add @nestjs/config
// import { ConfigModule } from '@nestjs/config';
// Note: IdempotencyModule will be imported once idempotency service is available
// import { IdempotencyModule } from '../idempotency/idempotency.module';
import { BillsController } from './bills.controller';
import { BillsService } from '../../shared/context/bills/bills.service';

@Module({
  imports: [
    // TODO: Uncomment once Bill entity is available in @avantodev/avanto-db
    // See docs/database-requests/2026-02-02-add-bill-entity.md for entity requirements
    // TypeOrmModule.forFeature([Bill]), // Using default connection (no connection name)
    // TODO: Uncomment once @nestjs/axios is installed: yarn add @nestjs/axios
    // HttpModule.register({
    //   timeout: 60000, // 60 seconds timeout
    //   maxRedirects: 5,
    // }),
    // TODO: Uncomment once @nestjs/config is installed: yarn add @nestjs/config
    // ConfigModule, // For environment variables
    // TODO: Uncomment once IdempotencyModule is available
    // IdempotencyModule,
  ],
  controllers: [BillsController],
  providers: [BillsService],
  exports: [BillsService], // Export if used by other modules
})
export class BillsModule {}
