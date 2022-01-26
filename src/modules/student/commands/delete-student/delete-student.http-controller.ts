import { routesV1 } from '@configs/app.routes'
import { DeleteStudentCommand } from '@modules/student/commands/delete-student/delete-student.command'
import { DeleteStudentService } from '@modules/student/commands/delete-student/delete-student.service'
import { Controller, Delete, Param } from '@nestjs/common'

@Controller(routesV1.version)
export class DeleteStudentHttpController {
  /**
   * constructor
   * @param {DeleteStudentService} service
   */
  constructor(private readonly service: DeleteStudentService) {}

  @Delete(routesV1.student.delete)
  async deleteStudent(@Param('id') id: string): Promise<void> {
    const command = new DeleteStudentCommand({ studentId: id })
    await this.service.execute(command)
  }
}
