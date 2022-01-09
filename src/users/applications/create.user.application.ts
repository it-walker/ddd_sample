import { Inject, Injectable } from '@nestjs/common';
import { UserDomain } from '@src/domain/user.domain';
import { TYPES } from '@src/interfaces/types';
import { ICreateUserApplication } from '@src/interfaces/users/applications/create.user.application.interface';
import { ICreateUserUseCase } from '@src/interfaces/users/usecases/create.user.service.usecase';

@Injectable()
export class CreateUserApplication implements ICreateUserApplication {
  constructor(
    @Inject(TYPES.services.ICreateUserService)
    private userService: ICreateUserUseCase,
  ) {}

  async create(user: UserDomain): Promise<UserDomain> {
    return this.userService.create(user);
  }
}
