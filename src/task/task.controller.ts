import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Res,
  UsePipes,
} from '@nestjs/common';

import { ValidationPipe } from '@/common/validation.pipe';
import { TaskDomain } from '@/domain/task.domain';
import { UserDomain } from '@/domain/user.domain';
import { ICreateTaskApplication } from '@/interfaces/tasks/applications/create.task.application.interface';
import { IPostponeTaskApplication } from '@/interfaces/tasks/applications/postpone.task.application.interface';
import { TYPES } from '@/interfaces/types';
import { ICreateUserApplication } from '@/interfaces/users/applications/create.user.application.interface';
import { IGetUserApplication } from '@/interfaces/users/applications/get.user.application.interface';

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
