import { AggregateRoot } from '@src/libs/ddd/domain/base-classes/aggregate-root.base';
import { UUID } from '@src/libs/ddd/domain/value-objects/uuid.value-object';

export interface CreateMailaddressProps {
  userId: UUID;
}

export interface MailaddressProps extends CreateMailaddressProps {
  email: string;
}

/**
 * mailaddress entity
 */
export class MailaddressEntity extends AggregateRoot<MailaddressProps> {
  protected readonly _id: UUID;

  /**
   * create mailaddres
   * @param {CreateMailaddressProps} create
   * @return {MailaddressEntity}
   */
  static create(create: CreateMailaddressProps): MailaddressEntity {
    const id = UUID.generate();
    const props: MailaddressProps = { ...create, email: '' };
    const mailaddress = new MailaddressEntity({ id, props });

    return mailaddress;
  }

  /**
   * check validate
   */
  validate(): void {}
}
