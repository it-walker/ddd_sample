import { Test } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { UserDomain } from '@src/domain/user.domain'
import { User } from '@src/entities/user.entity'
import { UserMailAddress } from '@src/entities/userMailAddress.entity'
import { CreateUserService } from '@src/users/services/create.user.service'
import { Repository } from 'typeorm'

describe('CreateUserService', () => {
  let service: CreateUserService
  let userRepositoryMock: Repository<User>
  let userMailAddressRepositoryMock: Repository<UserMailAddress>
  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        CreateUserService,
        {
          // how you provide the injection token in a test instance
          provide: getRepositoryToken(User),
          // as a class value, Repository needs no generics
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(UserMailAddress),
          useClass: Repository,
        },
      ],
    }).compile()

    service = app.get<CreateUserService>(CreateUserService)
    userRepositoryMock = app.get<Repository<User>>(getRepositoryToken(User))
    userMailAddressRepositoryMock = app.get<Repository<UserMailAddress>>(
      getRepositoryToken(UserMailAddress),
    )
  })

  describe('create', () => {
    it('should create user', async () => {
      const mail = 'test@gmail.com'
      const userDomain: UserDomain = {
        name: 'name',
        mailAddresses: [
          {
            value: mail,
          },
        ],
      }
      const expectedUserMailAddress: UserMailAddress = new UserMailAddress()
      expectedUserMailAddress.value = mail
      const m = new UserMailAddress()
      m.value = mail
      const u = new User()
      u.name = userDomain.name
      u.mailAddresses = [m]
      jest.spyOn(userRepositoryMock, 'save').mockResolvedValueOnce(u)
      jest
        .spyOn(userMailAddressRepositoryMock, 'save')
        .mockResolvedValueOnce(m)
      const result = await service.create(userDomain)
      expect(result).toMatchObject(userDomain)
      expect(userRepositoryMock.save).toBeCalled()
      expect(userMailAddressRepositoryMock.save).toBeCalled()
    })
  })
})
