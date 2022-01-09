import { routesV1 } from '@config/app.routes';
import { Controller, Delete, Param } from '@nestjs/common';

import { DeleteProductCommand } from './delete-product.commands';
import { DeleteProductService } from './delete-product.service';

@Controller(routesV1.version)
export class DeleteProductHttpController {
  constructor(private readonly service: DeleteProductService) {}

  @Delete(routesV1.product.delete)
  async deleteProduct(@Param('id') id: string): Promise<void> {
    const command = new DeleteProductCommand({ productId: id });
    await this.service.execute(command);
  }
}
