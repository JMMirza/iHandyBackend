import { EntityRepository, Repository } from 'typeorm';
import { Offer } from '../entities/offer.entity';

@EntityRepository(Offer)
export class OfferRepository extends Repository<Offer> {}
