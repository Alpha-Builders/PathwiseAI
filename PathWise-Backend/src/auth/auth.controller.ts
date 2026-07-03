import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Register a new user',
  })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('verify-email')
@ApiOperation({
  summary: 'Verify email address',
})
verifyEmail(@Body() dto: VerifyEmailDto) {
  return this.authService.verifyEmail(dto);
}

@Post('login')
@ApiOperation({
  summary: 'Login user',
})
login(@Body() dto: LoginDto) {
  return this.authService.login(dto);
}
}
