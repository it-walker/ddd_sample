import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Product } from '@/entities/product.entity';

import { CreateProductDto } from './dto/create-product.dto';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private prodcutRepository: ProductRepository,
  ) {}

  public async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    return await this.prodcutRepository.createProduct(createProductDto);
  }

  public async getProducts(): Promise<Product[]> {
    return await this.prodcutRepository.find();
  }

  public async getProduct(productId: number): Promise<Product> {
    const foundProduct = await this.prodcutRepository.findOne(productId);
    if (!foundProduct) {
      throw new NotFoundException('Product not found');
    }
    return foundProduct;
  }

  public async editProduct(
    productId: number,
    editProduct: CreateProductDto,
  ): Promise<Product> {
    const foundProduct = await this.prodcutRepository.findOne(productId);
    if (!foundProduct) {
      throw new NotFoundException('Product not found');
    }
    return this.prodcutRepository.editProduct(editProduct, foundProduct);
  }

  public async deleteProduct(productId: number): Promise<void> {
    await this.prodcutRepository.delete(productId);
  }
}
