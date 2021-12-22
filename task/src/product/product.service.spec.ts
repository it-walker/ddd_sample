import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';

const createProductDto = {
  name: 'sample name',
  description: 'sample description',
  price: 'sample price',
};

describe('ProductService', () => {
  let service;
  let repository;
  const mockProductRepository = () => ({
    createProduct: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    editProduct: jest.fn(),
    delete: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: ProductRepository,
          useFactory: mockProductRepository,
        },
      ],
    }).compile();
    service = module.get<ProductService>(ProductService);
    repository = module.get<ProductRepository>(ProductRepository);
  });

  describe('createProduct', () => {
    it('should save a product in the database', async () => {
      repository.createProduct.mockResolvedValue('sampleProduct');
      expect(repository.createProduct).not.toHaveBeenCalled();
      const result = await service.createProduct(createProductDto);
      expect(repository.createProduct).toHaveBeenCalledWith(createProductDto);
      expect(result).toEqual('sampleProduct');
    });
  });
  describe('getProducts', () => {
    it('returns products', async () => {
      const expectedProducts = [
        {
          id: 1,
          name: 'name1',
          description: 'description1',
          price: 'price1',
        },
        {
          id: 2,
          name: 'name2',
          description: 'description2',
          price: 'price2',
        },
        {
          id: 3,
          name: 'name3',
          description: 'description3',
          price: 'price3',
        },
      ];
      repository.find.mockResolvedValue(expectedProducts);
      expect(repository.find).not.toHaveBeenCalled();
      const result = await service.getProducts();
      expect(repository.find).toHaveBeenCalledWith();
      expect(result).toEqual(expectedProducts);
    });
  });
  describe('getProduct', () => {
    // [MethodUnderTest]_[Scenario]_[ExpectedResult] Where:
    // * MethodUnderTest is the name of the method you’re testing.
    // * Scenario is the condition under which you test the method.
    // * ExpectedResult is what you expect the method under test to do in the current scenario.

    // Using Given/When/Then for naming your unit tests
    it('returns product', async () => {
      const productId = 1;
      const expectedValue = {
        id: productId,
        name: 'sampleName',
        description: 'sampleDescription',
        price: 'samplePrice',
      };
      repository.findOne.mockResolvedValue(expectedValue);
      expect(repository.findOne).not.toHaveBeenCalled();
      const result = await service.getProduct(productId);
      expect(repository.findOne).toHaveBeenCalledWith(productId);
      expect(result).toEqual(expectedValue);
    });

    it('returns exception product not found', async () => {
      const productId = 1;
      repository.findOne.mockResolvedValue(null);
      expect(repository.findOne).not.toHaveBeenCalled();
      expect(() => service.getProduct(productId)).rejects.toThrow(
        new NotFoundException('Product not found'),
      );
      expect(repository.findOne).toHaveBeenCalledWith(productId);
    });
  });

  describe('editProduct', () => {
    it('returns edited product', async () => {
      const productId = 1;
      const editProduct = {
        ...createProductDto,
        name: 'edited name',
        description: 'edited description',
      };
      repository.findOne.mockResolvedValue(createProductDto);
      repository.editProduct.mockResolvedValue(editProduct);
      expect(repository.findOne).not.toHaveBeenCalled();
      expect(repository.editProduct).not.toHaveBeenCalled();
      const result = await service.editProduct(productId, editProduct);
      expect(repository.findOne).toHaveBeenCalledWith(productId);
      expect(repository.editProduct).toHaveBeenCalledWith(
        editProduct,
        createProductDto,
      );
      expect(result).toEqual(editProduct);
    });

    it('returns exception product not found', async () => {
      const productId = 1;
      const editProduct = {
        ...createProductDto,
        name: 'edited name',
        description: 'edited description',
      };
      repository.findOne.mockResolvedValue(null);
      expect(repository.findOne).not.toHaveBeenCalled();
      expect(() => service.editProduct(productId, editProduct)).rejects.toThrow(
        new NotFoundException('Product not found'),
      );
      expect(repository.findOne).toHaveBeenCalledWith(productId);
      expect(repository.editProduct).not.toHaveBeenCalled();
    });
  });

  describe('deleteProduct', () => {
    it('returns deleted product', async () => {
      const productId = 1;
      repository.delete.mockResolvedValue();
      expect(repository.delete).not.toHaveBeenCalled();
      const result = await service.deleteProduct(productId);
      expect(repository.delete).toHaveBeenCalledWith(productId);
      expect(result).toBeUndefined()
    });
  });
});
