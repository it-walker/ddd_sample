import { Provider } from '@nestjs/common'

import { CreateClubMemberWhenClubIsCreatedDomainEventHandler } from '@modules/clubMember/application/event-handlers/create-clubMember-when-club-is-created.domain-event-handler'

import { UnitOfWork } from '@src/infrastructure/database/unit-of-work/unit-of-work'

export const createClubMemberWhenClubIsCreatedProvider: Provider = {
  provide: CreateClubMemberWhenClubIsCreatedDomainEventHandler,
  useFactory: (
    unitOfWork: UnitOfWork,
  ): CreateClubMemberWhenClubIsCreatedDomainEventHandler => {
    const eventHandler = new CreateClubMemberWhenClubIsCreatedDomainEventHandler(
      unitOfWork,
    )
    eventHandler.listen()
    return eventHandler
  },
  inject: [UnitOfWork],
}
