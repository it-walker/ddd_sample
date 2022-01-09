import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  Res,
  UsePipes,
} from '@nestjs/common';
import { ValidationPipe } from '@src/common/validation.pipe';
import { ICreateTaskApplication } from '@src/interfaces/tasks/applications/create.task.application.interface';
import { IPostponeTaskApplication } from '@src/interfaces/tasks/applications/postpone.task.application.interface';
import { TYPES } from '@src/interfaces/types';

import { CreateTaskDto } from './dto/create.task.dto';
import { PostponeTaskDto } from './dto/postpone.task.dto';

@Controller('task')
export class TaskController {
  constructor(
    @Inject(TYPES.applications.ICreateTaskApplication)
    private createTaskApp: ICreateTaskApplication,
    @Inject(TYPES.applications.IPostponeTaskApplication)
    private postponeTaskApp: IPostponeTaskApplication,
  ) {}

  @UsePipes(new ValidationPipe())
  @Post('/create')
  async create(@Res() res, @Body() createTaskDto: CreateTaskDto) {
    const stock = await this.createTaskApp.create(createTaskDto);
    return res.status(HttpStatus.OK).json(stock);
  }

  @Post('/postpone')
  async postpone(@Res() res, @Body() postponeTaskDto: PostponeTaskDto) {
    const task = await this.postponeTaskApp.postpone(postponeTaskDto.id);
    return res.status(HttpStatus.OK).json(task);
  }
}
