import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestEventModule } from 'nest-event';
import { ConsoleModule } from 'nestjs-console';
import { join } from 'path';

import { AppConfigModule } from './config/app/config.module';
import { typeormConfig } from './infrastructure/configs/ormconfig';
import { UnitOfWorkModule } from './infrastructure/database/unit-of-work/unit-of-work.module';
import { ProductModule } from './modules/product/product.module';
import { UserModule } from './modules/user/user.module';
import { WalletModule } from './modules/wallet/wallet.module';

@Module({
  imports: [
    // TODO: DB接続を統一したい
    // MysqlDatabaseProviderModule,
    AppConfigModule,
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
  controllers: [],
  providers: [],
})
export class AppModule {}
