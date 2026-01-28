import { DataSource } from 'typeorm';
import 'dotenv/config';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [__dirname + '/../../**/entities/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource
        .initialize()
        .then((source) => {
          console.log('Data Source has been initialized!');
          return source;
        })
        .catch((err) => {
          console.error('Error during Data Source initialization', err);
          throw err;
        });
    },
  },
];
