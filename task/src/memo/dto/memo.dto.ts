import { IsString } from 'class-validator';

export class CreateMemoDto {
  @IsString()
  name: string;

  @IsString()
  description: string;
}
