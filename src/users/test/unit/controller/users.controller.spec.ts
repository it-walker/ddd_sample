import { Test, TestingModule } from '@nestjs/testing';

import { UserDomain } from '@/domain/user.domain';
import { TYPES } from '@/interfaces/types';
import { UsersController } from '@/users/users.controller';

const user: UserDomain = {
  name: 'Rafael Pezzetti',
  mailAddresses: [
    {
      value: 'rafael@pezzetti.com',
    },
  ],
};

class CreateUserApplicationMock {
  create(obj) {
    return user;
  }
}

class GetUserApplicationMock {
  getById(id) {
    return user;
  }
}

describe('Users Controller', () => {
  let controller: UsersController;
  let createUserAppMock;
  let getUserAppMock;
  const response = {
    status: (code: number) => response,
    json: (json) => json,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: TYPES.applications.ICreateUserApplication,
          useClass: CreateUserApplicationMock,
        },
        {
          provide: TYPES.applications.IGetUserApplication,
          useClass: GetUserApplicationMock,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    createUserAppMock = module.get(TYPES.applications.ICreateUserApplication);
    getUserAppMock = module.get(TYPES.applications.IGetUserApplication);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('findOne', () => {
    it('should get user by id', async () => {
      jest.spyOn(getUserAppMock, 'getById');

      const id = 'xxx';
      expect(await controller.findOne(id)).toEqual(user);
      expect(getUserAppMock.getById).toBeCalled();
    });
  });
  describe('create', () => {
    it('should create user', async () => {
      jest.spyOn(createUserAppMock, 'create');

      expect(await controller.create(response, user)).toEqual(user);
      expect(createUserAppMock.create).toBeCalled();
    });
  });
});
