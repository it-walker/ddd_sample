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
import { UserDomain } from '@/domain/user.domain';
import { TYPES } from '@/interfaces/types';
import { ICreateUserApplication } from '@/interfaces/users/applications/create.user.application.interface';
import { IGetUserApplication } from '@/interfaces/users/applications/get.user.application.interface';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(TYPES.applications.ICreateUserApplication)
    private createUserApp: ICreateUserApplication,
    @Inject(TYPES.applications.IGetUserApplication)
    private getUserApp: IGetUserApplication,
  ) {}

  @UsePipes(new ValidationPipe())
  @Post('/create')
  async create(@Res() res, @Body() userDomain: UserDomain) {
    const stock = await this.createUserApp.create(userDomain);
    return res.status(HttpStatus.OK).json(stock);
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id) {
    const user = await this.getUserApp.getById(id);
    console.log(user);
    return user;
  }
}
