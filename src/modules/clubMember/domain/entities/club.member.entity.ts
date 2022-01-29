import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base'
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object'

import { ClubProps } from '@src/modules/club/domain/entities/club.entity'
// import { WalletNotEnoughBalanceError } from '@modules/wallet/errors/wallet.errors'
// import { Result } from '@src/libs/ddd/domain/utils/result.util'

export interface CreateClubMemberProps {
  clubId: UUID;
  studentId: UUID;
  // club?: ClubProps;
  // studentId: UUID;
  // student: StudentEntity;
}

export interface ClubMemberProps extends CreateClubMemberProps {}

export class ClubMemberEntity extends AggregateRoot<ClubMemberProps> {
  protected readonly _id: UUID;

  /**
   *
   * @param {CreateClubMemberProps} create
   * @return {ClubMemberEntity}
   */
  static create(create: CreateClubMemberProps): ClubMemberEntity {
    const id = UUID.generate()
    // Setting a default role since it is not accepted during creation
    const props: ClubMemberProps = { ...create }
    const clubMember = new ClubMemberEntity({ id, props })

    return clubMember
  }

  // /**
  //  *
  //  * @param {number} amount
  //  */
  // deposit(amount: number): void {
  //   this.props.balance += amount
  // }

  // /**
  //  *
  //  * @param {number} amount
  //  * @return {Result<null, WalletNotEnoughBalanceError>}
  //  */
  // withdraw(amount: number): Result<null, WalletNotEnoughBalanceError> {
  //   if (this.props.balance - amount < 0) {
  //     return Result.err(new WalletNotEnoughBalanceError())
  //   }
  //   this.props.balance -= amount
  //   return Result.ok(null)
  // }

  /**
   * Protects wallet invariant.
   * This method is executed by a repository
   * before saving entity in a database.
   */
  public validate(): void {
    // if (this.props.balance < 0) {
    //   throw new ArgumentOutOfRangeException(
    //     'Wallet balance cannot be less than 0',
    //   );
    // }
  }
}
