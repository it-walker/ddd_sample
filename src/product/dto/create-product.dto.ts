import { IsString } from 'class-validator';

/**
 * CreateProductDto class
 */
export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  price: string;
}
