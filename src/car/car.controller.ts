import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { CarService } from './car.service';
import { CarDto } from './dto/car.dto';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get()
  async getCars() {
    return this.carService.getCars();
  }

  @Post()
  async postCar(@Body() car: CarDto) {
    return this.carService.postCar(car);
  }

  @Get(':id')
  async getCarById(@Param('id') id: number) {
    return this.carService.getCarById(id);
  }

  @Delete(':id')
  async deleteCarById(@Param('id') id: number) {
    this.carService.deleteCarById(id);
  }

  @Put(':id')
  async putCarById(@Param('id') id: number, @Query() query) {
    const propertyName = query.property_name;
    const propertyValue = query.property_value;
    return this.carService.putCarById(id, propertyName, propertyValue);
  }
}
