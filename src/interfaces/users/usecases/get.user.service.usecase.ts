import { UserDomain } from '@src/domain/user.domain'

export interface IGetUserUseCase {
  getById(id: string): Promise<UserDomain>;
}
