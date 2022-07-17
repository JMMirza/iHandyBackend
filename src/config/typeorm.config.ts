import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: '',
  host: '',
  port: ,
  username: '',
  password: '',
  database: '',
  autoLoadEntities: true,
  synchronize: true,
};
