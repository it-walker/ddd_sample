import { UserDomain } from '@/domain/user.domain';

export interface IGetUserUseCase {
  getById(id: string): Promise<UserDomain>;
}
