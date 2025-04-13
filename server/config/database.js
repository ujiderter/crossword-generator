import 'dotenv/config';

export const dbConfig = {
    type: '',
    host: process.env.DB_HOST || '',
    port: parseInt(process.env.DB_PORT) || 0,
    username: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || '',
    entities: ['src/entities/*.js'],
    synchronize: process.env.NODE_ENV !== 'production'
};