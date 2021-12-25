import { UserDomain } from '../../../domain/user.domain';

export interface IGetUserService {
  getById(id: string): Promise<UserDomain>;
}
