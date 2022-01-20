import { UserDomain } from '@src/domain/user.domain'

export interface IGetUserApplication {
  getById(id: string): Promise<UserDomain>;
}
