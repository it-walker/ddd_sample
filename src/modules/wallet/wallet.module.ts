import { WalletOrmEntity } from '@modules/wallet/database/wallet.orm-entity'
import { WalletRepository } from '@modules/wallet/database/wallet.repository'
import { createWalletWhenUserIsCreatedProvider } from '@modules/wallet/wallet.providers'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([WalletOrmEntity])],
  controllers: [],
  providers: [WalletRepository, createWalletWhenUserIsCreatedProvider],
})
/**
 * WalletModule class
 */
export class WalletModule { }
