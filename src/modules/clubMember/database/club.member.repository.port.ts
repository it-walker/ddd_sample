import { RepositoryPort } from '@libs/ddd/domain/ports/repository.ports'

import {
  ClubMemberEntity,
  ClubMemberProps,
} from '@modules/clubMember/domain/entities/club.member.entity'

export type ClubMemberRepositoryPort = RepositoryPort<
  ClubMemberEntity,
  ClubMemberProps
>;
