import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Req,
  Get,
  UseInterceptors,
  UploadedFile,
  Render,
  UploadedFiles,
} from '@nestjs/common';
import { ServiceProviderService } from './service_provider.service';
import { AuthCredentialsDto } from 'src/customer/dto/auth-credentials.dto';
import { UserSigninDto } from 'src/customer/dto/user-signin.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from '../utils/custom-file-name.utils';
import { imageFileFilter } from '../utils/file-uploading.utils';
import { ServiceProviderPersonalInfoDto } from './dto/serivice-provider-personal-info.dto';
import { CheckEmailDto } from 'src/customer/dto/check-email.dto';
import { Param } from '@nestjs/common';

@Controller('service-provider')
export class ServiceProviderController {
  constructor(private serviceProviderService: ServiceProviderService) {}
  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.serviceProviderService.signup(authCredentialDto);
  }

  @Post('/signin')
  signin(@Body(ValidationPipe) userSigninDto: UserSigninDto): Promise<object> {
    return this.serviceProviderService.signin(userSigninDto);
  }

  @Post('/verify-code')
  @UseGuards(AuthGuard())
  test(@Req() req: any, @Body() code: string) {
    // console.log(req);
    return this.serviceProviderService.verifyUser(req.user, code);
  }

  @Get('/resend-verification-code')
  @UseGuards(AuthGuard())
  resend_code(@Req() req) {
    return this.serviceProviderService.resendVerificationCode(req.user);
  }

  @Post('/add-personal-info')
  @UseGuards(AuthGuard())
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'profile_picture', maxCount: 1 },
        { name: 'photo_of_you_card', maxCount: 1 },
        { name: 'national_identity_back_img', maxCount: 1 },
        { name: 'national_identity_front_img', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './public/service_provider_uploads/server',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      },
    ),
  )
  async uploadedFile(
    @Req() req: any,
    @Body(ValidationPipe)
    userCustomerPersonalInfoDto: ServiceProviderPersonalInfoDto,
    @UploadedFiles()
    files: {
      profile_picture?: Express.Multer.File[];
      national_identity_front_img?: Express.Multer.File[];
      national_identity_back_img?: Express.Multer.File[];
      photo_of_you_card?: Express.Multer.File[];
    },
  ) {
    console.log(files.profile_picture[0].filename);
    return this.serviceProviderService.addPersonalInfo(
      req.user,
      userCustomerPersonalInfoDto,
      files.profile_picture[0].filename,
      files.national_identity_front_img[0].filename,
      files.national_identity_back_img[0].filename,
      files.photo_of_you_card[0].filename,
    );
  }

  @Post('/check-email')
  check_email(@Body(ValidationPipe) checkEmail: CheckEmailDto) {
    return this.serviceProviderService.checkEmail(checkEmail);
  }

  @Get('/change-password/:token')
  @Render('index.hbs')
  async change_password_ui(@Param('token') token: string) {
    const result = await this.serviceProviderService.checkUser(token);
    return { message: result };
  }
}
