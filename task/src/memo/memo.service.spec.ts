import { Test, TestingModule } from '@nestjs/testing';

import { MemoRepository } from './memo.repository';
import { MemoService } from './memo.service';

describe('MemoService', () => {
  let service;
  let repository;
  const mockMemoRepository = () => ({
    createMemo: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  });
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MemoService,
        {
          provide: MemoRepository,
          useFactory: mockMemoRepository,
        },
      ],
    }).compile();
    service = module.get<MemoService>(MemoService);
    repository = module.get<MemoRepository>(MemoRepository);
  });

  describe('createMemo', () => {
    it('should save a memo in the database', async () => {
      repository.createMemo.mockResolvedValue('sampleMemo');
      expect(repository.createMemo).not.toHaveBeenCalled();
      const createMemoDto = {
        name: 'sample name',
        description: 'sample description',
      };
      const result = await service.createProduct(createMemoDto);
      expect(repository.createMemo).toHaveBeenCalledWith(createMemoDto);
      expect(result).toEqual('sampleMemo');
    });
  });
});
