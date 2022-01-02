import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

import { MysqlConfigModule } from '@/config/database/mysql/config.module';
import { MysqlConfigService } from '@/config/database/mysql/config.service';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [MysqlConfigModule],
      useFactory: async (mysqlConfigService: MysqlConfigService) => ({
        type: mysqlConfigService.type,
        host: mysqlConfigService.host,
        port: mysqlConfigService.port,
        username: mysqlConfigService.username,
        password: mysqlConfigService.password,
        database: mysqlConfigService.database,
        synchronize: false,
        logging: false,
        entities: ['dist/entities/**/*.entity.js'],
        migrations: ['dist/migrations/**/*.js'],
        subscribers: ['dist/subscribers/**/*.js'],
        cli: {
          entitiesDir: 'src/entities',
          migrationsDir: 'src/migrations',
          subscribersDir: 'src/subscribers',
        },
      }),
      inject: [MysqlConfigService],
    } as TypeOrmModuleAsyncOptions),
  ],
})
export class MysqlDatabaseProviderModule {}
