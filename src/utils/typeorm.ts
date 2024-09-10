import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as fs from 'fs';

dotenvConfig({ path: '.env' });
let config = {};
if (process.env.NODE_ENV == 'production') {
  config = {
    type: 'postgres',
    host: `${process.env.NEONDB_HOST}`,
    port: `${process.env.POSTGRES_PORT}`,
    username: `${process.env.NEONDB_USER}`,
    password: `${process.env.NEONDB_PASSWORD}`,
    database: `${process.env.NEONDB_NAME}`,
    autoLoadEntities: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
    migrationsTableName: 'whoscore_migration_table',
    synchronize: false,
    migrationsRun: true,
    ssl: {
      //ca: fs.readFileSync('src/utils/crt/rds-ca-2019-root.pem').toString(),
    },
    cli: {
      migrationsDir: 'src/migrations',
    },
  };
} else {
  config = {
    type: 'postgres',
    ssl: process.env.SSL === 'true' ? true : false,
    host: `${process.env.PGHOST}`,
    port: `${process.env.POSTGRES_PORT}`,
    username: `${process.env.PGUSER}`,
    password: `${process.env.PGPASSWORD}`,
    database: `${process.env.PGDATABASE}`,
    autoLoadEntities: true,
    entities: ['dist/src/**/*.entity{.ts,.js}'],
    migrations: ['dist/src/migrations/*{.ts,.js}'],
    migrationsTableName: 'whoscore_migration_table',
    synchronize: false,
    migrationsRun: true, 
    cli: {
      migrationsDir: 'src/migrations',
    },
  };
}
export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
