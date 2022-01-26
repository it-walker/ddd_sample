import { RepositoryPort } from '@libs/ddd/domain/ports/repository.ports'
import { ClubEntity, ClubProps } from '@modules/club/domain/entities/club.entity'

export interface ClubRepositoryPort
  extends RepositoryPort<ClubEntity, ClubProps> {
  findOneByIdOrThrow(id: string): Promise<ClubEntity>;
  findOneByNameOrThrow(name: string): Promise<ClubEntity>;
  exists(name: string): Promise<boolean>;
}
