import { routesV1 } from '@config/app.routes';
import { Controller, Delete, Param } from '@nestjs/common';

import { DeleteProductCommand } from './delete-product.commands';
import { DeleteProductService } from './delete-product.service';

@Controller(routesV1.version)
/**
 * DeleteProductHttpController
 */
export class DeleteProductHttpController {
  /**
   * constructor
   * @param {DeleteProductService} service
   */
  constructor(private readonly service: DeleteProductService) {}

  @Delete(routesV1.product.delete)
  /**
   * @param {string} id
   */
  async deleteProduct(@Param('id') id: string): Promise<void> {
    const command = new DeleteProductCommand({ productId: id });
    await this.service.execute(command);
  }
}
