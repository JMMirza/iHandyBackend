import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'ec2-52-71-69-66.compute-1.amazonaws.com',
  port: 5432,
  username: 'kjcvshtuaedisn',
  password: '8b9dbbc048904d3855fb87d4517cfefc4be52ad01ff4c01636457f69ce69ea36',
  database: 'db88f5v32psfcd',
  autoLoadEntities: true,
  synchronize: true,
};
