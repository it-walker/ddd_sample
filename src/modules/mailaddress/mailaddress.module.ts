import { MailaddressOrmEntity } from '@modules/mailaddress/database/mailaddress.orm-entity'
import { MailaddressRepository } from '@modules/mailaddress/database/mailaddress.repository'
import { createMailaddressWhenUserIsCreatedProvider } from '@modules/mailaddress/mailaddress.providers'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

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
export class MailaddressModule { }
