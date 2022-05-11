import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { UserCustomerRepository } from './user_customer.respository';
import { UserCustomer } from './user_customer.entity';
import { UnauthorizedException } from '@nestjs/common';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserCustomerRepository)
    private userCustomerRepository: UserCustomerRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topSecret51',
    });
  }

  async validate(payload: JwtPayload): Promise<UserCustomer> {
    const { username } = payload;
    const user = await this.userCustomerRepository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException('Invalid access token');
    }
    return user;
  }
}
