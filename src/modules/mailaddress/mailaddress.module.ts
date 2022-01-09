import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MailaddressOrmEntity } from './database/mailaddress.orm-entity';
import { MailaddressRepository } from './database/mailaddress.repository';
import { createMailaddressWhenUserIsCreatedProvider } from './mailaddress.providers';

@Module({
  imports: [TypeOrmModule.forFeature([MailaddressOrmEntity])],
  controllers: [],
  providers: [
    MailaddressRepository,
    createMailaddressWhenUserIsCreatedProvider,
  ],
})
/**
 * MailaddressModule class
 */
export class MailaddressModule {}
