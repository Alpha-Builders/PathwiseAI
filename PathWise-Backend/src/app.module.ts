import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';
import mailConfig from './config/mail.config';
import { envValidationSchema } from './config/env.validation';

import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, databaseConfig, jwtConfig, mailConfig],
      validationSchema: envValidationSchema,
    }),

    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),

    PrismaModule,
    HealthModule,
    AuthModule,
  ],
})
export class AppModule {}