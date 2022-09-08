import { EntityRepository, Repository } from 'typeorm';
import { ServiceProvider } from '../entities/service_provider.entity';
import { AuthCredentialsDto } from '../../customer/dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserSigninDto } from '../../customer/dto/user-signin.dto';
import { ServiceProviderPersonalInfo } from '../entities/personal_info_service_provider.entity';
import { CheckEmailDto } from '../../customer/dto/check-email.dto';
import { ServiceProviderPersonalInfoDto } from '../dto/serivice-provider-personal-info.dto';

@EntityRepository(ServiceProvider)
export class ServiceProviderRepository extends Repository<ServiceProvider> {
  async signup(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<ServiceProvider> {
    const { username, password, email } = authCredentialsDto;
    const token = Math.floor(1000 + Math.random() * 9000);

    const salt = await bcrypt.genSalt();
    const user = new ServiceProvider();

    user.username = username;
    user.email = email;
    user.password = await this.hashPassword(password, salt);
    user.email_code = token;
    user.email_verified = false;
    user.salt = salt;

    try {
      const new_user = await user.save();
      return new_user;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('User already exists');
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async validateUserPassword(
    userSigninDto: UserSigninDto,
  ): Promise<ServiceProvider> {
    const { email, password } = userSigninDto;
    const user = await this.findOne({ email });

    if (user && user.validatePassword(password)) {
      return user;
    } else {
      return null;
    }
  }

  async verifyUser(user: ServiceProvider, code: any) {
    // console.log('user', user);
    if (user.email_verified == true) {
      return { msg: 'User is already verified' };
    } else {
      if (user.email_code == code.code) {
        user.email_verified = true;
        await user.save();
        return { msg: 'Congratulations! User is verified' };
      } else {
        return null;
      }
    }
  }

  async addPersonalInfo(
    user: ServiceProvider,
    userCustomerPersonalInfoDto: ServiceProviderPersonalInfoDto,
    profile_picture: string,
    national_identity_front_img: string,
    national_identity_back_img: string,
    photo_of_you_card: string,
  ) {
    const {
      surname,
      firstname,
      othernames,
      date_of_birth,
      gender,
      phone_number,
      address,
      national_identity_number,
      bank_name,
      account_holder_name,
      bank_verification_num,
    } = userCustomerPersonalInfoDto;
    const personal_info = new ServiceProviderPersonalInfo();
    personal_info.firstname = firstname;
    personal_info.surname = surname;
    personal_info.othernames = othernames;
    personal_info.date_of_bith = date_of_birth;
    personal_info.gender = gender;
    personal_info.phone_number = phone_number;
    personal_info.profile_picture = profile_picture;
    personal_info.serviceProvider = user;
    personal_info.national_identity_front_img = national_identity_front_img;
    personal_info.national_identity_back_img = national_identity_back_img;
    personal_info.photo_of_you_card = photo_of_you_card;
    personal_info.address = address;
    personal_info.national_identity_number = national_identity_number;
    personal_info.bank_name = bank_name;
    personal_info.bank_verification_num = bank_verification_num;
    personal_info.account_holder_name = account_holder_name;
    user.personal_info = true;
    try {
      await personal_info.save();
      await user.save();
      return { msg: 'Successfully added!!' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async checkEmail(checkEmail: CheckEmailDto): Promise<ServiceProvider> {
    const { email } = checkEmail;
    const user = await this.findOne({ email });
    if (!user) {
      throw new BadRequestException({ msg: 'User not found' });
    }
    return user;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
