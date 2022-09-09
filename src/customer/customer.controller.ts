import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Render,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CustomerService } from './customer.service';
import { AuthGuard } from '@nestjs/passport';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { editFileName } from 'src/utils/custom-file-name.utils';
import { imageFileFilter } from 'src/utils/file-uploading.utils';
import { UserCustomerPersonalInfoDto } from './dto/user-cust-personal-info.dto';
import { UserSigninDto } from './dto/user-signin.dto';
import { CheckEmailDto } from './dto/check-email.dto';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post('/signup')
  signUp(
    @Body() authCredentialDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.customerService.signup(authCredentialDto);
  }

  @Post('/signin')
  signin(@Body(ValidationPipe) userSigninDto: UserSigninDto): Promise<object> {
    return this.customerService.signin(userSigninDto);
  }

  @Post('/verify-code')
  @UseGuards(AuthGuard())
  test(@Req() req, @Body() code: string) {
    console.log(req);
    return this.customerService.verifyUser(req.user, code);
  }

  @Get('/resend-verification-code')
  @UseGuards(AuthGuard())
  resend_code(@Req() req) {
    return this.customerService.resendVerificationCode(req.user);
  }

  @Post('/add-personal-info')
  @UseGuards(AuthGuard())
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/customer_uploads/server',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(
    @Req() req: any,
    @Body(ValidationPipe)
    userCustomerPersonalInfoDto: UserCustomerPersonalInfoDto,
    @UploadedFile() file: any,
  ) {
    console.log(file, userCustomerPersonalInfoDto);
    return this.customerService.addPersonalInfo(
      req.user,
      userCustomerPersonalInfoDto,
      file.filename,
    );
  }

  @Post('/check-email')
  check_email(@Body(ValidationPipe) checkEmail: CheckEmailDto) {
    return this.customerService.checkEmail(checkEmail);
  }

  @Get('/change-password/:token')
  @Render('index.hbs')
  async change_password_ui(@Param('token') token: string) {
    const result = await this.customerService.checkUser(token);
    return { message: result };
  }
}
