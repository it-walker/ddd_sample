/**
 * DeleteTaskCommand class
 */
export class DeleteTaskCommand {
  /**
   * constructor
   * @param {DeleteTaskCommand} props
   */
  constructor(props: DeleteTaskCommand) {
    this.taskId = props.taskId;
  }

  readonly taskId: string;
}
