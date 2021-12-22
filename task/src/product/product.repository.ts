import { EntityRepository, Repository } from 'typeorm';

import { Product } from '../entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  public async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    const { name, description, price } = createProductDto;

    const product = new Product();
    product.name = name;
    product.description = description;
    product.price = price;

    await product.save();
    return product;
  }

  public async editProduct(
    createProductDto: CreateProductDto,
    editProduct: Product,
  ): Promise<Product> {
    const { name, description, price } = createProductDto;

    editProduct.name = name;
    editProduct.description = description;
    editProduct.price = price;
    await editProduct.save();

    return editProduct;
  }
}
