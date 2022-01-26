import { DomainEventHandler } from '@libs/ddd/domain/domain-events'
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object'
import { UserCreatedDomainEvent } from '@modules/user/domain/events/user-created.domain-event'
import { WalletRepositoryPort } from '@modules/wallet/database/wallet.repository.port'
import { WalletEntity } from '@modules/wallet/domain/entities/wallet.entity'
import { UnitOfWork } from '@src/infrastructure/database/unit-of-work/unit-of-work'

/**
 * CreateWalletWhenUserIsCreatedDomainEventHandler class
 */
export class CreateWalletWhenUserIsCreatedDomainEventHandler extends DomainEventHandler {
  /**
   * constructor
   * @param {UnitOfWork} unitOfWork
   */
  constructor(private readonly unitOfWork: UnitOfWork) {
    super(UserCreatedDomainEvent)
  }

  /**
   * Handle a Domain Event by perform changes to other aggregates (inside the same Domain).
   * @param {UserCreatedDomainEvent} event
   * @return {Promise<void>}
   */
  async handle(event: UserCreatedDomainEvent): Promise<void> {
    const walletRepo: WalletRepositoryPort =
      this.unitOfWork.getWalletRepository(event.correlationId)
    const wallet = WalletEntity.create({
      userId: new UUID(event.aggregateId),
    })
    await walletRepo.save(wallet)
  }
}
