import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarModule } from './car/car.module';
import { MemoModule } from './memo/memo.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [TypeOrmModule.forRoot(), MemoModule, CarModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
