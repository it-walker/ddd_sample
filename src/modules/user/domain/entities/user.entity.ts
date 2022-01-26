import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base'
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object'
import { UpdateUserAddressProps, UserRoles } from '@modules/user/domain/entities/user.types'
import { UserCreatedDomainEvent } from '@modules/user/domain/events/user-created.domain-event'
import { Address, AddressProps } from '@modules/user/domain/value-objects/address.value-object'
import { Email } from '@modules/user/domain/value-objects/email.value-object'

// Properties that are needed for a user creation
export interface CreateUserProps {
  email: Email;
  address: Address;
}

// All properties that a User has
export interface UserProps extends CreateUserProps {
  role: UserRoles;
}

/**
 * UserEntity class
 */
export class UserEntity extends AggregateRoot<UserProps> {
  protected readonly _id: UUID;

  /**
   *
   * @param {CreateUserProps} create
   * @return {UserEntity}
   */
  static create(create: CreateUserProps): UserEntity {
    const id = UUID.generate()
    /* Setting a default role since we are not accepting it during creation. */
    const props: UserProps = { ...create, role: UserRoles.guest }
    const user = new UserEntity({ id, props })
    /* adding "UserCreated" Domain Event that will be published
    eventually so an event handler somewhere may receive it and do an
    appropriate action */
    user.addEvent(
      new UserCreatedDomainEvent({
        aggregateId: id.value,
        email: props.email.getRawProps(),
        ...props.address.getRawProps(),
      }),
    )
    return user
  }

  /**
   *
   */
  get role(): UserRoles {
    return this.props.role
  }

  /**
   *
   */
  makeAdmin(): void {
    this.props.role = UserRoles.admin
  }

  /**
   *
   */
  makeModerator(): void {
    this.props.role = UserRoles.moderator
  }

  /**
   *
   * @param {UpdateUserAddressProps} props
   */
  updateAddress(props: UpdateUserAddressProps): void {
    this.props.address = new Address({
      ...this.props.address,
      ...props,
    } as AddressProps)

    // Note: AddressUpdatedDomainEvent can be emitted here if needed.
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
