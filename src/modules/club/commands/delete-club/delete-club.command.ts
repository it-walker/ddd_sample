export class DeleteClubCommand {
  /**
   * constructor
   * @param {DeleteClubCommand} props
   */
  constructor(props: DeleteClubCommand) {
    this.clubId = props.clubId
  }

  readonly clubId: string;
}
