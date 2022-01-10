import { Param } from '@nestjs/common';
import { DeleteTaskCommand } from './delete-task.command';

/**
 * DeleteTaskHttpController class
 */
export class DeleteTaskHttpController {
  /**
   * constructor
   * @param {DeleteTaskService} service
   */
  constructor(private readonly service: DeleteTaskService) {}

  /**
   *
   * @param {string} id
   */
  async deleteTask(@Param('id') id: string): Promise<void> {
    const command = new DeleteTaskCommand({ taskId: id });
    await this.service.execute(command);
  }
}
