import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from 'src/customer/dto/auth-credentials.dto';
import { MailService } from 'src/mail/mail.service';
import { ServiceProviderRepository } from './repositories/service_provider.repository';
import { JwtPayload } from '../jwt/payload/jwt-payload.interface';
import { jwtConfigurations } from '../config/jwt.config';
import { ServiceProvider } from './entities/service_provider.entity';
import { UserSigninDto } from 'src/customer/dto/user-signin.dto';
import { ServiceProviderPersonalInfoDto } from './dto/serivice-provider-personal-info.dto';
import { CheckEmailDto } from 'src/customer/dto/check-email.dto';

@Injectable()
export class ServiceProviderService {
  constructor(
    @InjectRepository(ServiceProviderRepository)
    private serviceProviderRepository: ServiceProviderRepository,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async signup(
    authCredentialDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const user = await this.serviceProviderRepository.signup(authCredentialDto);
    const token = user.email_code.toString();
    const username = user.username;
    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload, {
      secret: jwtConfigurations.secret,
      expiresIn: '300s',
    });
    await this.mailService.sendUserConfirmation(
      user,
      token,
      false,
      'service_provider',
    );
    return { accessToken };
  }

  async verifyUser(username: string, code: string) {
    const user = await this.serviceProviderRepository.findOne({ username });
    const result = await this.serviceProviderRepository.verifyUser(user, code);
    if (!result) {
      throw new UnauthorizedException('Verification code is not valid');
    }
    return result;
  }

  async signin(userSigninDto: UserSigninDto): Promise<object> {
    const user = await this.serviceProviderRepository.validateUserPassword(
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

  async resendVerificationCode(user: ServiceProvider): Promise<object> {
    const token = Math.floor(1000 + Math.random() * 9000);
    if (user.email_verified == false) {
      user.email_code = token;
      await user.save();
      await this.mailService.sendUserConfirmation(
        user,
        token.toString(),
        false,
        'service_provider',
      );
      return {
        msg: 'Verfication code send successfully. Please check your email again.',
      };
    } else {
      return { msg: 'Your email is already verified.' };
    }
  }

  async addPersonalInfo(
    username: string,
    userCustomerPersonalInfoDto: ServiceProviderPersonalInfoDto,
    profile_picture,
    national_identity_front_img,
    national_identity_back_img,
    photo_of_you_card,
  ) {
    const user = await this.serviceProviderRepository.findOne({ username });
    if (user.personal_info == true) {
      throw new BadRequestException({
        msg: 'Your personal info is already added',
      });
    }
    return this.serviceProviderRepository.addPersonalInfo(
      user,
      userCustomerPersonalInfoDto,
      profile_picture,
      national_identity_front_img,
      national_identity_back_img,
      photo_of_you_card,
    );
  }

  async checkEmail(checkEmail: CheckEmailDto) {
    const user = await this.serviceProviderRepository.checkEmail(checkEmail);
    const username = user.username;
    const payload: JwtPayload = { username };
    const accessToken = this.jwtService.sign(payload, {
      secret: jwtConfigurations.secret,
      expiresIn: '600s',
    });
    await this.mailService.sendUserConfirmation(
      user,
      accessToken,
      true,
      'service_provider',
    );
    return { msg: 'Email sent successfully' };
  }

  async checkUser(accessToken: string) {
    try {
      var decoded = this.jwtService.verify(accessToken, {
        secret: jwtConfigurations.secret,
      });
      return decoded.username;
    } catch (err) {
      throw new InternalServerErrorException({ msg: err.message });
    }
  }
}
