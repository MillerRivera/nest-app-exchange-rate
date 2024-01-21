import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const { username, password } = body;

    const user = await this.authService.validateUser(username, password);

    if (!user.success) {
      return { message: 'Credenciales inválidas' };
    }

    const token = this.authService.generateJwtToken(user);
    return { token };
  }
}
