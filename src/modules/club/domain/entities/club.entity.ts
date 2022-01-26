import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base'
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object'

import { ClubCreatedDomainEvent } from '@modules/club/domain/events/club-created.domain-event'
import { ClubName } from '@modules/club/domain/value-objects/club.name.value-object'

export interface CreateClubProps {
  name: ClubName;
}

export interface ClubProps extends CreateClubProps {
  isApproval: boolean
}

export class ClubEntity extends AggregateRoot<ClubProps> {
  protected readonly _id: UUID;

  /**
   *
   * @param {CreateClubProps} create
   * @return {ClubEntity}
   */
  static create(create: CreateClubProps): ClubEntity {
    const id = UUID.generate()
    const props: ClubProps = { ...create, isApproval: false }
    const club = new ClubEntity({ id, props })
    club.addEvent(
      new ClubCreatedDomainEvent({
        aggregateId: id.value,
        name: props.name.getRawProps(),
        isApproval: props.isApproval,
      }),
    )
    return club
  }

  /**
   *
   */
  someBusinessLogic(): void {
    // TODO: add example business logic
  }

  /**
   *
   */
  validate(): void {
    // TODO: example
    // entity business rules validation to protect it's invariant
  }
}
