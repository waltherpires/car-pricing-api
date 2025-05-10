import { DataSource, DataSourceOptions } from "typeorm"

const appDataSource = new DataSource({
    migrations: [__dirname + '/migrations/*{.js,.ts}'],
} as DataSourceOptions);

switch (process.env.NODE_ENV) {
      case 'development':
    Object.assign(appDataSource, {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['**/*.entity.js'],
    });
    break;
  case 'test':
    Object.assign(appDataSource, {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: ['**/*.entity.ts'],
      migrationsRuns: true,
    });
    break;
  case 'production':
    Object.assign(appDataSource, {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      migrationsRun: true,
      entities: ['**/*.entity.js'],
      ssl: {
        rejectUnauthorized: false
      }
    });
    break;
  default:
    throw new Error ('unknown environment');
}

export default appDataSource;