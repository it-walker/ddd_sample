import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '@src/entities/user.entity'
import { UserMailAddress } from '@src/entities/userMailAddress.entity'
import { TYPES } from '@src/interfaces/types'
import { CreateUserApplication } from '@src/users/applications/create.user.application'
import { GetUserApplication } from '@src/users/applications/get.user.application'
import { CreateUserService } from '@src/users/services/create.user.service'
import { GetUserService } from '@src/users/services/get.user.service'
import { UsersController } from '@src/users/users.controller'

const createUserApp = {
  provide: TYPES.applications.ICreateUserApplication,
  useClass: CreateUserApplication,
}
const getUserApp = {
  provide: TYPES.applications.IGetUserApplication,
  useClass: GetUserApplication,
}

const createUserService = {
  provide: TYPES.services.ICreateUserService,
  useClass: CreateUserService,
}
const getUserService = {
  provide: TYPES.services.IGetUserService,
  useClass: GetUserService,
}

@Module({
  imports: [TypeOrmModule.forFeature([User, UserMailAddress])],
  controllers: [UsersController],
  providers: [createUserApp, getUserApp, createUserService, getUserService],
})
/**
 * ユーザーモジュール
 */
export class UsersModule { }
