import { Module } from '@nestjs/common'
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm'
import { MysqlConfigModule } from '@src/config/database/mysql/config.module'
import { MysqlConfigService } from '@src/config/database/mysql/config.service'

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
        synchronize: true,
        logging: false,
        entities: ['dist/**/*.orm-entity.js'],
        migrationsTableName: 'migrations',
        migrations: ['dist/**/migrations/*.js'],
        seeds: ['dist/**/seeding/**/*.seeder.js'],
        factories: ['dist/**/factories/**/*.js'],
        cli: {
          migrationsDir: 'src/infrastructure/database/migrations',
        },
      }),
      inject: [MysqlConfigService],
    } as TypeOrmModuleAsyncOptions),
  ],
})
/**
 * MysqlDatabaseProviderModule class
 */
export class MysqlDatabaseProviderModule {}
