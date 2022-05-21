import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserCustomer } from './user_customer.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@EntityRepository(UserCustomer)
export class UserCustomerRepository extends Repository<UserCustomer> {
  async signup(authCredentialsDto: AuthCredentialsDto): Promise<UserCustomer> {
    const { username, password, email } = authCredentialsDto;
    const token = Math.floor(1000 + Math.random() * 9000);

    const salt = await bcrypt.genSalt();
    const user = new UserCustomer();

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
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async validateUserPassword(
    authCredentialDto: AuthCredentialsDto,
  ): Promise<UserCustomer> {
    const { username, password } = authCredentialDto;
    const user = await this.findOne({ username });

    if (user && user.validatePassword(password)) {
      return user;
    } else {
      return null;
    }
  }

  async verifyUser(user: UserCustomer, code) {
    // code = parseInt(code);
    console.log(user.email_code == code.code);
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
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
