import { pinoOptions } from './shared/infrastructure/logger/pinoLoggerOptions';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appPostgresDataSource } from './shared/infrastructure/persistance/postgre-sql/PostgresDataSource';
import { CorrelationIdMiddleware } from './shared/middleware/correlation-id/correlation-id.middleware';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenantTypesModule } from './context/tenant-types/tenant-types.module';
import { TenantsModule } from './context/tenants/tenants.module';
import { TenantsConfigModule } from './context/tenants-config/tenants-config.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(appPostgresDataSource),
    LoggerModule.forRoot(pinoOptions),
    TenantTypesModule,
    TenantsModule,
    TenantsConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}
