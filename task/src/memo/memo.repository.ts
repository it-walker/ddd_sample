import { Memo } from 'src/entities/memo.entity';
import { EntityRepository, Repository } from 'typeorm';

import { CreateMemoDto } from './dto/memo.dto';

@EntityRepository(Memo)
export class MemoRepository extends Repository<Memo> {
  public async createMemo(createMemoDto: CreateMemoDto): Promise<Memo> {
    const { name, description } = createMemoDto;

    const memo = new Memo();
    memo.name = name;
    memo.description = description;

    await memo.save();
    return memo;
  }

  public async editMemo(
    createMemoDto: CreateMemoDto,
    editMemo: Memo,
  ): Promise<Memo> {
    const { name, description } = createMemoDto;

    editMemo.name = name;
    editMemo.description = description;
    await editMemo.save();

    return editMemo;
  }
}
