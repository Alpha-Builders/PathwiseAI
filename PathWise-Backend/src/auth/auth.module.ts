import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { JwtStrategy } from './strategies/jwt.strategy';
import { StringValue } from 'ms';

@Module({
  imports: [
    PassportModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: config.getOrThrow<string>('JWT_SECRET_EXPIRES_IN', ) as StringValue,
        },
      }),
    }),

    MailerModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    transport: {
      host: config.getOrThrow('MAIL_HOST'),
      port: config.getOrThrow('MAIL_PORT'),
      auth: {
        user: config.get('MAIL_USER'),
        pass: config.get('MAIL_PASS'),
      },
    },
  }),
}),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}