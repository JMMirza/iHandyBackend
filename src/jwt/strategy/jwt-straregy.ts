import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from '../payload/jwt-payload.interface';
import { UnauthorizedException } from '@nestjs/common';
import { jwtConfigurations } from '../../config/jwt.config';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfigurations.secret,
    });
  }

  async validate(payload: JwtPayload) {
    const { username } = payload;

    if (!username) {
      throw new UnauthorizedException('Invalid access token');
    }
    return username;
  }
}
