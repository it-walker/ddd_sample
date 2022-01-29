import { join } from 'path'

import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NestEventModule } from 'nest-event'
import { ConsoleModule } from 'nestjs-console'

import { ClubModule } from '@modules/club/club.module'
import { ClubMemberModule } from '@modules/clubMember/club.member.module'
import { ProductModule } from '@modules/product/product.module'
import { StudentModule } from '@modules/student/student.module'
import { TaskModule } from '@modules/task/task.module'
import { UserModule } from '@modules/user/user.module'
import { WalletModule } from '@modules/wallet/wallet.module'

import { AppConfigModule } from '@src/config/app/config.module'
import { typeormConfig } from '@src/infrastructure/configs/ormconfig'
import { UnitOfWorkModule } from '@src/infrastructure/database/unit-of-work/unit-of-work.module'

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
    TaskModule,
    ClubModule,
    ClubMemberModule,
    StudentModule,
  ],
  controllers: [],
  providers: [],
})
/**
 * アプリケーションモジュール
 */
export class AppModule {}
