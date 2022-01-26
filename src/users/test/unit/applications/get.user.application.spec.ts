import { NotFoundException } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { UserDomain } from '@src/domain/user.domain'
import { TYPES } from '@src/interfaces/types'
import { GetUserApplication } from '@src/users/applications/get.user.application'

const user: UserDomain = {
  name: 'Rafael Pezzetti',
  mailAddresses: [{ value: 'rafael@pezzetti.com' }],
}
const userId = 'xxx'

/**
 * GetUserService class
 */
class GetUserService {
  /**
   *
   * @param {any} userId
   * @return {any}
   */
  getById(userId) {
    return user
  }
}

describe('GetUserApplication', () => {
  let application: GetUserApplication
  let service: GetUserService
  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        GetUserApplication,
        {
          provide: TYPES.services.IGetUserService,
          useClass: GetUserService,
        },
      ],
    }).compile()

    service = app.get<GetUserService>(TYPES.services.IGetUserService)
    application = app.get<GetUserApplication>(GetUserApplication)
  })

  describe('getById', () => {
    it('should get user by id', async () => {
      expect(await application.getById(userId)).toEqual(user)
    })

    it('throws 404 error when user is not found', async () => {
      jest.spyOn(service, 'getById').mockImplementation(() => null)
      try {
        await application.getById(userId)
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
        expect(error.message).toEqual(`User with id ${userId} was not found`)
      }
    })
  })
})
