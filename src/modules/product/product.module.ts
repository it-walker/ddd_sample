import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateProductCliController } from './commands/createUser/create-product.cli.controller';
import { CreateProductGraphqlResolver } from './commands/createUser/create-product.graphql-resolver';

import { CreateProductHttpController } from './commands/createUser/create-product.http.controller';
import { CreateProductMessageController } from './commands/createUser/create-product.message.controller';
import { CreateProductService } from './commands/createUser/create-product.service';
import { ProductOrmEntity } from './database/product.orm-entity';
import { ProductRepository } from './database/product.repository';
import { createProductCliLoggerProvider } from './product.provider';

const httpControllers = [
  CreateProductHttpController,
  // DeleteUserHttpController,
  // FindUsersHttpController,
];

const messageControllers = [CreateProductMessageController];

const cliControllers = [CreateProductCliController];

const graphqlResolvers = [
  CreateProductGraphqlResolver,
  // FindProductsGraphqlResolver
];

const repositories = [ProductRepository];

const commandHandlers = [
  CreateProductService,
  // DeleteUserService
];

// const queryHandlers = [FindUsersQueryHandler];

@Module({
  imports: [TypeOrmModule.forFeature([ProductOrmEntity]), CqrsModule],
  controllers: [...httpControllers, ...messageControllers],
  providers: [
    ...cliControllers,
    ...repositories,
    ...graphqlResolvers,
    ...commandHandlers,
    // ...queryHandlers,
    createProductCliLoggerProvider,
  ],
})
export class ProductModule {}
