// auth.controller.ts
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() user: User): Promise<User> {
    return this.userService.createUser(user);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req): Promise<{ access_token: string }> {
    const token = this.jwtService.sign({ username: req.user.username });
    return { access_token: token };
  }
}
