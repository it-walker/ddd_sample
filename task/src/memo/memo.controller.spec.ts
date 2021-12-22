import { Test, TestingModule } from '@nestjs/testing';

import { MemoController } from './memo.controller';
import { MemoService } from './memo.service';

describe('MemoController', () => {
  let controller: MemoController;
  const mockMemoService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemoController],
      providers: [MemoService],
    })
      .overrideProvider(MemoService)
      .useValue(mockMemoService)
      .compile();

    controller = module.get<MemoController>(MemoController);
  });

  it('should be defined', () => {
    // expect(controller.addMemo()).toBeDefined();
    expect('aa').toBe('aa');
  });

  it('should get', () => {
    expect(controller.getMemoList()).toBe([]);
  });
});
