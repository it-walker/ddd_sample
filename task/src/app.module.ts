import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemoModule } from './memo/memo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    MemoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
