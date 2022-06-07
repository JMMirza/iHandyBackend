import { Module } from '@nestjs/common';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfferRepository } from './repositories/offer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OfferRepository])],
  controllers: [OffersController],
  providers: [OffersService],
})
export class OffersModule {}
