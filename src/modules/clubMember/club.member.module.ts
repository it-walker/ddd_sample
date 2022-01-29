import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { createClubMemberWhenClubIsCreatedProvider } from '@modules/clubMember/club.member.providers'
import { ClubMemberOrmEntity } from '@modules/clubMember/database/club.member.orm-entity'
import { ClubMemberRepository } from '@modules/clubMember/database/club.member.repository'

@Module({
  imports: [TypeOrmModule.forFeature([ClubMemberOrmEntity])],
  controllers: [],
  providers: [ClubMemberRepository, createClubMemberWhenClubIsCreatedProvider],
})
export class ClubMemberModule {}
