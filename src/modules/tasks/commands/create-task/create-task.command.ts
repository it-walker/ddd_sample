import {
  Command,
  CommandProps,
} from '@src/libs/ddd/domain/base-classes/command.base';

/**
 * CreateTaskCommand class
 */
export class CreateTaskCommand extends Command {
  /**
   * constructor
   * @param {CommandProps<CreateTaskCommand>} props
   */
  constructor(props: CommandProps<CreateTaskCommand>) {
    super(props);
    this.name = props.name;
    this.dueDate = props.dueDate;
    this.postponeCount = props.postponeCount;
    this.status = props.status;
  }

  readonly name: string;
  readonly dueDate: Date;
  readonly postponeCount: number;
  readonly status: TaskStatusType;
}
