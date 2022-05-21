import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCustomerRepository } from './user_customer.respository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { MailService } from '../mail/mail.service';
import { UserCustomer } from './user_customer.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserCustomerRepository)
    private userCustomerRepository: UserCustomerRepository,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async signup(
    authCredentialDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const user = await this.userCustomerRepository.signup(authCredentialDto);
    const token = user.email_code.toString();
    const username = user.username;
    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);
    await this.mailService.sendUserConfirmation(user, token);
    return { accessToken };
  }

  async signin(
    authCredentialDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const user = await this.userCustomerRepository.validateUserPassword(
      authCredentialDto,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    if (user.email_verified == true) {
      const username = user.username;
      const payload: JwtPayload = { username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      return {
        accessToken: 'Your are not allowed untill you verify your email',
      };
    }
  }

  async verifyUser(user: UserCustomer, code: string) {
    const result = await this.userCustomerRepository.verifyUser(user, code);
    if (!result) {
      throw new UnauthorizedException('Verification code is not valid');
    }
    return result;
  }
}
