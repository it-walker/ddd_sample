import { Provider } from '@nestjs/common'

import { CreateWalletWhenUserIsCreatedDomainEventHandler } from '@modules/wallet/application/event-handlers/create-wallet-when-user-is-created.domain-event-handler'

import { UnitOfWork } from '@src/infrastructure/database/unit-of-work/unit-of-work'

export const createWalletWhenUserIsCreatedProvider: Provider = {
  provide: CreateWalletWhenUserIsCreatedDomainEventHandler,
  useFactory: (
    unitOfWork: UnitOfWork,
  ): CreateWalletWhenUserIsCreatedDomainEventHandler => {
    const eventHandler = new CreateWalletWhenUserIsCreatedDomainEventHandler(
      unitOfWork,
    )
    eventHandler.listen()
    return eventHandler
  },
  inject: [UnitOfWork],
}
