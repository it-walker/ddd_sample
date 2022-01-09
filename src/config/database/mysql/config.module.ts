import * as Joi from '@hapi/joi';
import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';

import {MysqlConfigService} from './config.service';
import configuration from './configuration';
/**
 * Import and provide app configuration related classes.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
      load: [configuration],
      validationSchema: Joi.object({
        DATABASE_USER: Joi.string().default('root'),
        DATABASE_PASSWORD: Joi.string().default('password'),
      }),
    }),
  ],
  providers: [ConfigService, MysqlConfigService],
  exports: [ConfigService, MysqlConfigService],
})
export class MysqlConfigModule {}
