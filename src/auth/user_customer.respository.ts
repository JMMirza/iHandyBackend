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
    const { username, password } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const user = new UserCustomer();

    user.username = username;
    user.password = await this.hashPassword(password, salt);
    user.salt = salt;

    try {
      const new_user = await user.save();
      return new_user;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    authCredentialDto: AuthCredentialsDto,
  ): Promise<string> {
    const { username, password } = authCredentialDto;
    const user = await this.findOne({ username });

    if (user && user.validatePassword(password)) {
      return user.username;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
