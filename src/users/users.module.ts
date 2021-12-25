import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../entities/user.entity';
import { CreateUserApplication } from './applications/create.user.application';
import { GetUserApplication } from './applications/get.user.application';
import { UsersController } from './controller/users.controller';
import { TYPES } from '../interfaces/types';
import { CreateUserService } from './services/create.user.service';
import { GetUserService } from './services/get.user.service';

const createUserApp = {
  provide: TYPES.applications.ICreateUserApplication,
  useClass: CreateUserApplication,
};
const getUserApp = {
  provide: TYPES.applications.IGetUserApplication,
  useClass: GetUserApplication,
};

const createUserService = {
  provide: TYPES.services.ICreateUserService,
  useClass: CreateUserService,
};
const getUserService = {
  provide: TYPES.services.IGetUserService,
  useClass: GetUserService,
};

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [createUserApp, getUserApp, createUserService, getUserService],
})
export class UsersModule {}
