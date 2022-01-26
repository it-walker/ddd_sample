import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CreateProductCliController } from '@modules/product/commands/create-product/create-product.cli.controller'
import { CreateProductGraphqlResolver } from '@modules/product/commands/create-product/create-product.graphql-resolver'
import { CreateProductHttpController } from '@modules/product/commands/create-product/create-product.http.controller'
import { CreateProductMessageController } from '@modules/product/commands/create-product/create-product.message.controller'
import { CreateProductService } from '@modules/product/commands/create-product/create-product.service'
import { DeleteProductHttpController } from '@modules/product/commands/delete-product/delete-product.http-controller'
import { DeleteProductService } from '@modules/product/commands/delete-product/delete-product.service'
import { ProductOrmEntity } from '@modules/product/database/product.orm-entity'
import { ProductRepository } from '@modules/product/database/product.repository'
import { createProductCliLoggerProvider } from '@modules/product/product.provider'
import { FindProductsGraphqlResolver } from '@modules/product/queries/find-products/find-products.graphql-resolver'
import { FindProductsHttpController } from '@modules/product/queries/find-products/find-products.http.controller'
import { FindProductsQueryHandler } from '@modules/product/queries/find-products/find-products.query-handler'

const httpControllers = [
  CreateProductHttpController,
  DeleteProductHttpController,
  FindProductsHttpController,
]

const messageControllers = [CreateProductMessageController]

const cliControllers = [CreateProductCliController]

const graphqlResolvers = [
  CreateProductGraphqlResolver,
  FindProductsGraphqlResolver,
]

const repositories = [ProductRepository]

const commandHandlers = [CreateProductService, DeleteProductService]

const queryHandlers = [FindProductsQueryHandler]

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
export class ProductModule { }
