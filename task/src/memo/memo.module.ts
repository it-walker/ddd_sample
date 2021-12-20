import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Memo } from 'src/entities/memo.entity';

import { MemoController } from './memo.controller';
import { MemoService } from './memo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Memo])],
  exports: [TypeOrmModule],
  providers: [MemoService],
  controllers: [MemoController],
})
export class MemoModule {}
