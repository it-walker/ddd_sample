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
import { ValidationPipe } from '@src/common/validation.pipe';
import { UserDomain } from '@src/domain/user.domain';
import { TYPES } from '@src/interfaces/types';
import { ICreateUserApplication } from '@src/interfaces/users/applications/create.user.application.interface';
import { IGetUserApplication } from '@src/interfaces/users/applications/get.user.application.interface';

@Controller('users')
/**
 * ユーザーコントローラー
 */
export class UsersController {
  /**
   * コンストラクタ
   * @param {ICreateUserApplication} createUserApp - create user アプリケーション
   * @param {IGetUserApplication} getUserApp - get user アプリケーション
   */
  constructor(
    @Inject(TYPES.applications.ICreateUserApplication)
    private createUserApp: ICreateUserApplication,
    @Inject(TYPES.applications.IGetUserApplication)
    private getUserApp: IGetUserApplication,
  ) {}

  @UsePipes(new ValidationPipe())
  @Post('/create')
  /**
   * @param {any} res
   * @param {any} userDomain
   */
  async create(@Res() res, @Body() userDomain: UserDomain) {
    const stock = await this.createUserApp.create(userDomain);
    return res.status(HttpStatus.OK).json(stock);
  }

  @Get(':id')
  /**
   * @params {any} id - request
   */
  async findOne(@Param('id', new ParseUUIDPipe()) id) {
    const user = await this.getUserApp.getById(id);
    return user;
  }
}
