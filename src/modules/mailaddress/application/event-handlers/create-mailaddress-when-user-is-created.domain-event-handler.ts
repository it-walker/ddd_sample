import { MailaddressRepositoryPort } from '@modules/mailaddress/database/mailaddress.repository.port'
import { MailaddressEntity } from '@modules/mailaddress/domain/entities/mailaddress.entity'
import { UnitOfWork } from '@src/infrastructure/database/unit-of-work/unit-of-work'
import {
  DomainEvent,
  DomainEventHandler,
} from '@src/libs/ddd/domain/domain-events'
import { UUID } from '@src/libs/ddd/domain/value-objects/uuid.value-object'
import { UserCreatedDomainEvent } from '@src/modules/user/domain/events/user-created.domain-event'

/**
 * create mailaddress when user is created domain event handler class
 */
export class CreateMailaddressWhenUserIsCreatedDomainEventHandler extends DomainEventHandler {
  /**
   * constructor
   * @param {UnitOfWorkModule} unitOfWork - unit of work
   */
  constructor(private readonly unitOfWork: UnitOfWork) {
    super(UserCreatedDomainEvent)
  }

  /**
   *
   * @param {DomainEvent} event - event
   * @return {void}
   */
  async handle(event: DomainEvent): Promise<void> {
    const userMailaddressRepo: MailaddressRepositoryPort =
      this.unitOfWork.getMailaddressRepository(event.correlationId)
    const userMailaddress = MailaddressEntity.create({
      userId: new UUID(event.aggregateId),
    })
    await userMailaddressRepo.save(userMailaddress)
  }
}
