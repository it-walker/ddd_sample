import { RepositoryPort } from '@src/libs/ddd/domain/ports/repository.ports';

import {
  MailaddressEntity,
  MailaddressProps,
} from '../domain/entities/mailaddress.entity';

export type MailaddressRepositoryPort = RepositoryPort<
  MailaddressEntity,
  MailaddressProps
>;
