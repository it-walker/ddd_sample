/**
 * DeleteUserCommand class
 */
export class DeleteUserCommand {
  /**
   * constructor
   * @param {DeleteUserCommand} props
   */
  constructor(props: DeleteUserCommand) {
    this.userId = props.userId;
  }

  readonly userId: string;
}
