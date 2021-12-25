import { UserDomain } from '../../../domain/user.domain';

export interface IGetUserApplication {
  getById(id: string): Promise<UserDomain>;
}
