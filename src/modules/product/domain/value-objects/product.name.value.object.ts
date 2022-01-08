import { ValueObject } from '@src/libs/ddd/domain/base-classes/value-object.base';
import { Guard } from '@src/libs/ddd/domain/guard';
import { ArgumentOutOfRangeException } from '@src/libs/exceptions';

export interface ProductProps {
  name: string;
}

export class ProductName extends ValueObject<ProductProps> {
  get value(): string {
    return this.props.name;
  }

  protected validate(props: ProductProps): void {
    if (!Guard.lengthIsBetween(props.name, 5, 200)) {
      throw new ArgumentOutOfRangeException('name is out of range');
    }
  }
}
