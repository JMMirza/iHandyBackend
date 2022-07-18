import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '82.180.155.127',
  port: 5432,
  username: 'jmmirza',
  password: 'tiptop123',
  database: 'ihandy',
  autoLoadEntities: true,
  synchronize: true,
};
