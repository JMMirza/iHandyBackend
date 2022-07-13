import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'postgresql-82657-0.cloudclusters.net',
  port: 16271,
  username: 'user',
  password: 'postgres',
  database: 'ihandy',
  autoLoadEntities: true,
  synchronize: true,
};
