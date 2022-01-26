import { RepositoryPort } from '@libs/ddd/domain/ports/repository.ports'
import { WalletEntity, WalletProps } from '@modules/wallet/domain/entities/wallet.entity'

export type WalletRepositoryPort = RepositoryPort<WalletEntity, WalletProps>;
