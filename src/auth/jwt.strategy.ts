// jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from './user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '123456789@#$%^',
    });
  }

  async validate(payload: any): Promise<any> {
    const user = await this.userService.findByUsername(payload.username);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
