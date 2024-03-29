import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Customer } from '../customer/entities/customer.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(
    user: any,
    token: string,
    forgetEmail: boolean,
    user_type: string,
  ) {
    if (forgetEmail == true) {
      if (user_type == 'service_provider') {
        const url = `${process.env.URL}/service-provider/change-password/${token}`;
        await this.mailerService.sendMail({
          to: user.email,
          // from: '"Support Team" <support@example.com>', // override default from
          subject: 'Welcome to iHandy App! Change your password',
          template: 'templates/confirmation.hbs', // `.hbs` extension is appended automatically
          context: {
            name: user.username,
            code: url,
          },
        });
      } else {
        const url = `${process.env.URL}/customer/change-password/${token}`;
        await this.mailerService.sendMail({
          to: user.email,
          // from: '"Support Team" <support@example.com>', // override default from
          subject: 'Welcome to iHandy App! Change your password',
          template: 'templates/confirmation.hbs', // `.hbs` extension is appended automatically
          context: {
            name: user.username,
            code: url,
          },
        });
      }
    } else {
      await this.mailerService.sendMail({
        to: user.email,
        // from: '"Support Team" <support@example.com>', // override default from
        subject: 'Welcome to iHandy App! Confirm your Email',
        template: 'templates/confirmation.hbs', // `.hbs` extension is appended automatically
        context: {
          name: user.username,
          code: user.email_code,
        },
      });
    }
  }
}
