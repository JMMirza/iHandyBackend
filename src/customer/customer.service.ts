import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCustomerRepository } from './repositories/customer.respository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../jwt/payload/jwt-payload.interface';
import { MailService } from '../mail/mail.service';
import { Customer } from './entities/customer.entity';
import { UserCustomerPersonalInfoDto } from './dto/user-cust-personal-info.dto';
import { UserSigninDto } from './dto/user-signin.dto';
import { jwtConfigurations } from 'src/config/jwt.config';
import { CheckEmailDto } from './dto/check-email.dto';

@Injectable()
export class CustomerService {
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
    const accessToken = await this.jwtService.sign(payload, {
      secret: jwtConfigurations.secret,
      expiresIn: '300s',
    });
    await this.mailService.sendUserConfirmation(user, token, false);
    return { accessToken };
  }

  async verifyUser(user: Customer, code: string) {
    const result = await this.userCustomerRepository.verifyUser(user, code);
    if (!result) {
      throw new UnauthorizedException('Verification code is not valid');
    }
    return result;
  }

  async signin(userSigninDto: UserSigninDto): Promise<object> {
    const user = await this.userCustomerRepository.validateUserPassword(
      userSigninDto,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const username = user.username;
    const payload: JwtPayload = { username };

    if (user.email_verified == true) {
      if (user.personal_info == false) {
        const accessToken = this.jwtService.sign(payload, {
          secret: jwtConfigurations.secret,
          expiresIn: '1hr',
        });
        throw new BadRequestException({
          accessToken: accessToken,
          msg: 'You must have to enter personal information',
        });
      }
      const accessToken = this.jwtService.sign(payload, {
        secret: jwtConfigurations.secret,
        expiresIn: '1hr',
      });
      return { accessToken: accessToken, msg: 'User Signed in successfully' };
    } else {
      const accessToken = this.jwtService.sign(payload, {
        secret: jwtConfigurations.secret,
        expiresIn: '300s',
      });
      throw new BadRequestException({
        accessToken: accessToken,
        msg: 'User must have to verify its email',
      });
    }
  }

  async resendVerificationCode(user: Customer): Promise<object> {
    const token = Math.floor(1000 + Math.random() * 9000);
    if (user.email_verified == false) {
      user.email_code = token;
      await user.save();
      await this.mailService.sendUserConfirmation(
        user,
        token.toString(),
        false,
      );
      return {
        msg: 'Verfication code send successfully. Please check your email again.',
      };
    } else {
      return { msg: 'Your email is already verified.' };
    }
  }

  async addPersonalInfo(
    user: Customer,
    userCustomerPersonalInfoDto: UserCustomerPersonalInfoDto,
    profile_picture: string,
  ) {
    if (user.personal_info == true) {
      throw new BadRequestException({
        msg: 'Your personal info is already added',
      });
    }
    // this.userCustomerPersonalInfoRepository.addPersonalInfo()
    return this.userCustomerRepository.addPersonalInfo(
      user,
      userCustomerPersonalInfoDto,
      profile_picture,
    );
  }

  async checkEmail(checkEmail: CheckEmailDto) {
    const user = await this.userCustomerRepository.checkEmail(checkEmail);
    const username = user.username;
    const payload: JwtPayload = { username };
    const accessToken = this.jwtService.sign(payload, {
      secret: jwtConfigurations.secret,
      expiresIn: '600s',
    });
    await this.mailService.sendUserConfirmation(user, accessToken, true);
    return { msg: 'Email sent successfully' };
  }
}
