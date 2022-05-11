import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCustomerRepository } from './user_customer.respository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserCustomerRepository)
    private userCustomerRepository: UserCustomerRepository,
    private jwtService: JwtService,
  ) {}

  async signup(authCredentialDto: AuthCredentialsDto): Promise<void> {
    return this.userCustomerRepository.signup(authCredentialDto);
  }

  async signin(
    authCredentialDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const username = await this.userCustomerRepository.validateUserPassword(
      authCredentialDto,
    );
    if (!username) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }
}
