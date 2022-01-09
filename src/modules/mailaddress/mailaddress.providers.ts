import { Provider } from '@nestjs/common';
import { UnitOfWork } from '@src/infrastructure/database/unit-of-work/unit-of-work';

import { CreateMailaddressWhenUserIsCreatedDomainEventHandler } from './application/event-handlers/create-mailaddress-when-user-is-created.domain-event-handler';

export const createMailaddressWhenUserIsCreatedProvider: Provider = {
  provide: CreateMailaddressWhenUserIsCreatedDomainEventHandler,
  useFactory: (
    unitOfWork: UnitOfWork,
  ): CreateMailaddressWhenUserIsCreatedDomainEventHandler => {
    const evnetHandler =
      new CreateMailaddressWhenUserIsCreatedDomainEventHandler(unitOfWork);
    evnetHandler.listen();
    return evnetHandler;
  },
  inject: [UnitOfWork],
};
