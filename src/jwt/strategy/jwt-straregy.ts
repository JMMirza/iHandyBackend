import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from '../payload/jwt-payload.interface';
import { UserCustomerRepository } from '../../customer/repositories/customer.respository';
import { Customer } from '../../customer/entities/customer.entity';
import { UnauthorizedException } from '@nestjs/common';
import { jwtConfigurations } from '../../config/jwt.config';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserCustomerRepository)
    private userCustomerRepository: UserCustomerRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfigurations.secret,
    });
  }

  async validate(payload: JwtPayload): Promise<Customer> {
    const { username } = payload;
    const user = await this.userCustomerRepository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException('Invalid access token');
    }
    return user;
  }
}
