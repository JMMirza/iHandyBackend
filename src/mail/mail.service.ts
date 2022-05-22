import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Customer } from '../customer/entities/customer.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: Customer, token: string) {
    const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to i Handy App! Confirm your Email',
      template: 'templates/confirmation.hbs', // `.hbs` extension is appended automatically
      context: {
        name: user.username,
        code: user.email_code,
      },
    });
  }
}
