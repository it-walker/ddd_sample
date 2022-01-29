import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base'

export interface ClubMemberProps {
  clubId: string;
  studentId: string;
  nickName: string;
  role: string;
}

export class ClubMember extends ValueObject<ClubMemberProps> {
  get role(): string {
    return this.props.role
  }

  get studentId(): string {
    return this.props.studentId
  }

  get clubId(): string {
    return this.props.clubId
  }
  /**
   *
   * @param {DomainPrimitive<string>} param0
   */
  protected validate(props: ClubMemberProps): void {
    // if (!Guard.lengthIsBetween(value, 5, 320)) {
    //   throw new ArgumentOutOfRangeException('ClubName')
    // }
  }
}
