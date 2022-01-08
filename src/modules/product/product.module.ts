import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateProductCliController } from './commands/create-product/create-product.cli.controller';
import { CreateProductGraphqlResolver } from './commands/create-product/create-product.graphql-resolver';

import { CreateProductHttpController } from './commands/create-product/create-product.http.controller';
import { CreateProductMessageController } from './commands/create-product/create-product.message.controller';
import { CreateProductService } from './commands/create-product/create-product.service';
import { DeleteProductHttpController } from './commands/delete-product/delete-product.http-controller';
import { DeleteProductService } from './commands/delete-product/delete-product.service';
import { ProductOrmEntity } from './database/product.orm-entity';
import { ProductRepository } from './database/product.repository';
import { createProductCliLoggerProvider } from './product.provider';
import { FindProductsGraphqlResolver } from './queries/find-products/find-products.graphql-resolver';
import { FindProductsHttpController } from './queries/find-products/find-products.http.controller';
import { FindProductsQueryHandler } from './queries/find-products/find-products.query-handler';

const httpControllers = [
  CreateProductHttpController,
  DeleteProductHttpController,
  FindProductsHttpController,
];

const messageControllers = [CreateProductMessageController];

const cliControllers = [CreateProductCliController];

const graphqlResolvers = [
  CreateProductGraphqlResolver,
  FindProductsGraphqlResolver,
];

const repositories = [ProductRepository];

const commandHandlers = [CreateProductService, DeleteProductService];

const queryHandlers = [FindProductsQueryHandler];

@Module({
  imports: [TypeOrmModule.forFeature([ProductOrmEntity]), CqrsModule],
  controllers: [...httpControllers, ...messageControllers],
  providers: [
    ...cliControllers,
    ...repositories,
    ...graphqlResolvers,
    ...commandHandlers,
    ...queryHandlers,
    createProductCliLoggerProvider,
  ],
})
export class ProductModule {}
