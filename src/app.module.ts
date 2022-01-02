import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app/config.module';
import { MysqlConfigModule } from './config/database/mysql/config.module';
import { MysqlConfigService } from './config/database/mysql/config.service';
import { ProductModule } from './product/product.module';
import { MysqlDatabaseProviderModule } from './providers/database/mysql/provider.module';
import { TaskModule } from './task/task.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MysqlDatabaseProviderModule,
    AppConfigModule,
    MysqlConfigModule,
    ProductModule,
    UsersModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
