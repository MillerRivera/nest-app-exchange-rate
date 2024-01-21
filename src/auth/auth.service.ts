// auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  
  private SECURITY_USER = "admin";
  private SECURITY_PASSWORD = "exchange2024";

  constructor(private readonly jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    if (username == this.SECURITY_USER && password == this.SECURITY_PASSWORD)
    {
        return { sesionId: 1, username: 'ADMIN - LOGIN', success:true };
    }else{
        return { msg: 'Credentials not found', success:false };
    }
  }

  generateJwtToken(user: any): string {
    const payload = { username: user.username, sub: user.sesionId };
    return this.jwtService.sign(payload);
  }
}