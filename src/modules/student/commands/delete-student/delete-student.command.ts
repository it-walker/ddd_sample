export class DeleteStudentCommand {
  /**
   * constructor
   * @param {DeleteStudentCommand} props
   */
  constructor(props: DeleteStudentCommand) {
    this.studentId = props.studentId
  }

  readonly studentId: string;
}
