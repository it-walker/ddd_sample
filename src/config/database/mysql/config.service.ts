import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/**
 * Service dealing with app config based operations.
 *
 * @class
 */
@Injectable()
export class MysqlConfigService {
  constructor(private configService: ConfigService) {}

  get type(): string {
    return this.configService.get<string>('database.type');
  }
  get host(): string {
    return this.configService.get<string>('database.host');
  }
  get port(): number {
    return this.configService.get<number>('database.port');
  }
  get username(): string {
    return this.configService.get<string>('database.username');
  }
  get password(): string {
    return this.configService.get<string>('database.password');
  }
  get database(): string {
    return this.configService.get<string>('database.database');
  }
}
