import { ModelBase } from '@libs/ddd/interface-adapters/interfaces/model.base.interface'

export interface Club extends ModelBase {
  name: string;
  isApproval: boolean;
}
