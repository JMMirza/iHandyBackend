import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'ec2-44-198-82-71.compute-1.amazonaws.com',
  port: 5432,
  username: 'lmhiqdgislknqs',
  password: 'a886e015d07c873612bae0caf142f69d81c28636d93b85da9f3bdc189158cfa8',
  database: 'd59b3mpn5suo4k',
  autoLoadEntities: true,
  synchronize: true,
  url: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
};
