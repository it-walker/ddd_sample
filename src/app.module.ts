import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestEventModule } from 'nest-event';
import { ConsoleModule } from 'nestjs-console';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app/config.module';
import { typeormConfig } from './infrastructure/configs/ormconfig';
import { UnitOfWorkModule } from './infrastructure/database/unit-of-work/unit-of-work.module';
import { ProductModule } from './modules/product/product.module';
import { UserModule } from './modules/user/user.module';
import { WalletModule } from './modules/wallet/wallet.module';
import { MysqlDatabaseProviderModule } from './providers/database/mysql/provider.module';
// import { ProductModule } from './product/product.module';
// import { MysqlDatabaseProviderModule } from './providers/database/mysql/provider.module';
// import { TaskModule } from './task/task.module';
// import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: 'password',
    //   database: 'ddd',
    //   synchronize: true,
    //   logging: false,
    //   entities: ['dist/**/*.orm-entity.js'],
    //   migrationsTableName: 'migrations',
    //   migrations: ['dis/**/migrations/*.js'],
    //   cli: {
    //     migrationsDir: 'dist/infrastructure/database/migrations',
    //   },
    // }),
    // MysqlDatabaseProviderModule,
    AppConfigModule,
    // MysqlConfigModule,
    // ProductModule,
    // UsersModule,
    // TaskModule,
    TypeOrmModule.forRoot(typeormConfig),
    // only if you are using GraphQL
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/infrastructure/schema.gql'),
    }),
    UnitOfWorkModule,
    NestEventModule,
    ConsoleModule,
    UserModule,
    WalletModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
