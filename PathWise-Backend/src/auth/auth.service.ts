import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { MailerService } from '@nestjs-modules/mailer';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { generateOTP } from './utils/generate-otp';
import { VerificationType } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly mailerService: MailerService, private readonly jwtService: JwtService, private readonly config: ConfigService ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await argon2.hash(dto.password);

    const user = await this.prisma.user.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        password: hashedPassword,
      },
    });

   const otp = generateOTP();

await this.prisma.verificationCode.create({
  data: {
    code: otp,
    type: VerificationType.EMAIL_VERIFICATION,
    expiresAt: new Date(Date.now() + 2 * 60 * 1000),
    userId: user.id,
  },
});

await this.mailerService.sendMail({
  to: user.email,
  subject: 'Verify your PathWise AI account',
  html: `
      <h2>Welcome to PathWise AI</h2>
      <p>Your verification code is:</p>
      <h1>${otp}</h1>
      <p>This code expires in 2 minutes.</p>
  `,
});

return {
  message:
    'Registration successful. Please check your email for the verification code.',
};
  }

  async verifyEmail(dto: VerifyEmailDto) {
  const user = await this.prisma.user.findUnique({
    where: {
      email: dto.email,
    },
  });

  if (!user) {
    throw new BadRequestException('User not found');
  }

  const verification = await this.prisma.verificationCode.findFirst({
    where: {
      userId: user.id,
      code: dto.code,
      type: VerificationType.EMAIL_VERIFICATION,
    },
  });

  if (!verification) {
    throw new BadRequestException('Invalid verification code');
  }

  if (verification.expiresAt < new Date()) {
    throw new BadRequestException('Verification code has expired');
  }

  await this.prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      isVerified: true,
    },
  });

  await this.prisma.verificationCode.delete({
    where: {
      id: verification.id,
    },
  });

  return {
    message: 'Email verified successfully',
  };
}

private async generateTokens(userId: string, email: string) {
  const payload = {
    sub: userId,
    email,
  };

  const accessToken = await this.jwtService.signAsync(payload);

  const refreshToken = await this.jwtService.signAsync(payload, {
    secret: this.config.get('jwt.refreshSecret'),
    expiresIn: this.config.get('jwt.refreshExpiresIn'),
  });

  return {
    accessToken,
    refreshToken,
  };
}

async login(dto: LoginDto) {
  const user = await this.prisma.user.findUnique({
    where: {
      email: dto.email,
    },
  });

  if (!user) {
    throw new BadRequestException('Invalid credentials');
  }

  const passwordMatches = await argon2.verify(
    user.password,
    dto.password,
  );

  if (!passwordMatches) {
    throw new BadRequestException('Invalid credentials');
  }

  if (!user.isVerified) {
    throw new BadRequestException(
      'Please verify your email first',
    );
  }

  const tokens = await this.generateTokens(
    user.id,
    user.email,
  );

  const hashedRefresh = await argon2.hash(tokens.refreshToken);

  await this.prisma.refreshToken.create({
    data: {
      hashedToken: hashedRefresh,
      expiresAt: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000,
      ),
      userId: user.id,
    },
  });

  await this.prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      lastLoginAt: new Date(),
    },
  });

  return {
    message: 'Login successful',

    accessToken: tokens.accessToken,

    refreshToken: tokens.refreshToken,

    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    },
  };
}
}

