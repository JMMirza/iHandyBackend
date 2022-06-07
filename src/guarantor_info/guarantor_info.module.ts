import { Module } from '@nestjs/common';
import { GuarantorInfoService } from './guarantor_info.service';
import { GuarantorInfoController } from './guarantor_info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuarantorInfoRepository } from './repositories/guarantor_info.repository';

@Module({
  imports: [TypeOrmModule.forFeature([GuarantorInfoRepository])],
  controllers: [GuarantorInfoController],
  providers: [GuarantorInfoService],
})
export class GuarantorInfoModule {}
