import { DeleteTaskCommand } from '@modules/task/commands/delete-task/delete-task.command'
import { DeleteTaskService } from '@modules/task/commands/delete-task/delete-task.service'
import { Controller, Delete, Param } from '@nestjs/common'
import { routesV1 } from '@src/infrastructure/configs/app.routes'

@Controller(routesV1.version)
/**
 * DeleteTaskHttpController class
 */
export class DeleteTaskHttpController {
  /**
   * constructor
   * @param {DeleteTaskService} service
   */
  constructor(private readonly service: DeleteTaskService) { }

  @Delete(routesV1.task.delete)
  /**
   *
   * @param {string} id
   */
  async deleteTask(@Param('id') id: string): Promise<void> {
    const command = new DeleteTaskCommand({ taskId: id })
    await this.service.execute(command)
  }
}
