import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Memo } from 'src/entities/memo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MemoService {
  constructor(
    @InjectRepository(Memo)
    private readonly memoRepository: Repository<Memo>,
  ) {}

  addMemo(name: string, description: string) {
    const memo = new Memo();
    memo.name = name;
    memo.description = description;
    return this.memoRepository.insert(memo);
  }

  getMemoList() {
    return this.memoRepository.find();
  }
}
