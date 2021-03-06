import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: ConnectionOptions & TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  host: process.env.DATABASE_HOST ?? 'localhost',
  port: parseInt(process.env.DATABASE_PORT ?? '5432'),
  database: process.env.DATABASE_NAME ?? 'r2_db',
  username: process.env.DATABASE_USERNAME ?? 'postgres',
  password: process.env.DATABASE_PASSWORD,
  autoLoadEntities: true,
  namingStrategy: new SnakeNamingStrategy(),
  migrations: ['migrations/*.ts'],
  entities: ['dist/**/*.entity{.js,.ts}'],
  cli: {
    migrationsDir: 'migrations',
  },
  ...(process.env.DATABASE_URL
    ? {
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {}),
};

export = config;
