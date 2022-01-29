import { DomainEventHandler } from '@libs/ddd/domain/domain-events'
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object'

import { ClubCreatedDomainEvent } from '@modules/club/domain/events/club-created.domain-event'
import { ClubMemberRepositoryPort } from '@modules/clubMember/database/club.member.repository.port'
import { ClubMemberEntity } from '@modules/clubMember/domain/entities/club.member.entity'

import { UnitOfWork } from '@src/infrastructure/database/unit-of-work/unit-of-work'

export class CreateClubMemberWhenClubIsCreatedDomainEventHandler extends DomainEventHandler {
  /**
   * constructor
   * @param {UnitOfWork} unitOfWork
   */
  constructor(private readonly unitOfWork: UnitOfWork) {
    super(ClubCreatedDomainEvent)
  }

  /**
   * Handle a Domain Event by perform changes to other aggregates (inside the same Domain).
   * @param {ClubCreatedDomainEvent} event
   * @return {Promise<void>}
   */
  async handle(event: ClubCreatedDomainEvent): Promise<void> {
    const clubMemberRepository: ClubMemberRepositoryPort = this.unitOfWork.getClubMemberRepository(
      event.correlationId,
    )
    await clubMemberRepository.saveMultiple(
      event.memberIds.map((id) => {
        return ClubMemberEntity.create({
          clubId: new UUID(event.aggregateId),
          studentId: new UUID(id),
        })
      }),
    )
  }
}
