import {
  Command,
  CommandProps,
} from '@src/libs/ddd/domain/base-classes/command.base'

/**
 * CreateTaskCommand class
 */
export class CreateTaskCommand extends Command {
  /**
   * constructor
   * @param {CommandProps<CreateTaskCommand>} props
   */
  constructor(props: CommandProps<CreateTaskCommand>) {
    super(props)
    this.name = props.name
    this.dueDate = props.dueDate
  }

  readonly name: string;
  readonly dueDate: Date;
}
