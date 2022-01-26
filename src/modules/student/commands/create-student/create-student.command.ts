import {
  Command,
  CommandProps,
} from '@src/libs/ddd/domain/base-classes/command.base'

export class CreateStudentCommand extends Command {
  /**
   * @param {CommandProps<CreateStudentCommand>} props
   */
  constructor(props: CommandProps<CreateStudentCommand>) {
    super(props)
    this.name = props.name
  }

  readonly name: string;
}
