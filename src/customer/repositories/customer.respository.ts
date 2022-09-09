import { EntityRepository, Repository } from 'typeorm';
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Customer } from '../entities/customer.entity';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { UserCustomerPersonalInfoDto } from '../dto/user-cust-personal-info.dto';
import { CustomerPersonalInfo } from '../entities/personal_info.entity';
import { UserSigninDto } from '../dto/user-signin.dto';
import { CheckEmailDto } from '../dto/check-email.dto';

@EntityRepository(Customer)
export class UserCustomerRepository extends Repository<Customer> {
  async signup(authCredentialsDto: AuthCredentialsDto): Promise<Customer> {
    const { username, password, email } = authCredentialsDto;
    const token = Math.floor(1000 + Math.random() * 9000);

    const salt = await bcrypt.genSalt();
    const user = new Customer();

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

  async validateUserPassword(userSigninDto: UserSigninDto): Promise<Customer> {
    const { email, password } = userSigninDto;
    const user = await this.findOne({ email });

    if (user && user.validatePassword(password)) {
      return user;
    } else {
      return null;
    }
  }

  async verifyUser(user: Customer, code: any) {
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
    user: Customer,
    userCustomerPersonalInfoDto: UserCustomerPersonalInfoDto,
    profile_picture: string,
  ) {
    const {
      surname,
      firstname,
      othernames,
      date_of_birth,
      gender,
      phone_number,
    } = userCustomerPersonalInfoDto;
    const personal_info = new CustomerPersonalInfo();
    personal_info.firstname = firstname;
    personal_info.surname = surname;
    personal_info.othernames = othernames;
    personal_info.date_of_bith = date_of_birth;
    personal_info.gender = gender;
    personal_info.phone_number = phone_number;
    personal_info.profile_picture = profile_picture;
    personal_info.customer = user;
    user.personal_info = true;
    try {
      await personal_info.save();
      await user.save();
      return { msg: 'Successfully added!!' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async checkEmail(checkEmail: CheckEmailDto): Promise<Customer> {
    const { email } = checkEmail;
    const user = await this.findOne({ email });
    if (!user) {
      throw new BadRequestException({ msg: 'User not found' });
    }
    return user;
  }

  async checkCustomer(username: string): Promise<Customer> {
    const user = await this.findOne({ username });
    if (!user) {
      throw new BadRequestException({ msg: 'User not found' });
    }
    return user;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
