import {
  MailaddressEntity,
  MailaddressProps,
} from '@modules/mailaddress/domain/entities/mailaddress.entity'
import { RepositoryPort } from '@src/libs/ddd/domain/ports/repository.ports'

export type MailaddressRepositoryPort = RepositoryPort<
  MailaddressEntity,
  MailaddressProps
>;
