// local.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from './user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({ usernameField: 'username' });
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isValid = await this.userService.comparePasswords(password, user.password);

    if (!isValid) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
