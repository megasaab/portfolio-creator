export const LOG_LEVELS: any = (process.env.LOG_LEVELS || 'debug,log,warn,error,verbose').split(',');
export const APPLICATION_PORT = process.env.PORTFOLIO_APPLICATION_PORT || 3200;
export const MONGO_URL = process.env.PORTFOLIO_APPLICATION_MONGO_URL || 'mongodb://localhost:27017/portfolio-db';
export const MONGO_USER = process.env.PORTFOLIO_APPLICATION_MONGO_USER || 'portfolio-root';
export const MONGO_PASS = process.env.PORTFOLIO_APPLICATION_MONGO_PASS || 'portfolio-root';
export const JWT_SECRET = process.env.PORTFOLIO_JWT_SECRET || 'afka;lkfakewr';
export const JWT_EXPIRES_IN = process.env.PORTFOLIO_JWT_EXPIRES_IN || '24h';
export const BCRYPT_HASH_ROUNDS = 10;

// Errors
export const INTERNAL_ERROR = 'Internal server error';
export const INVALID_CREDENTIALS = 'Invalid Credentials';
export const NOT_FOUND = 'Not Found';

// Mailer settings
export const MAILER_HOST = process.env.MAILER_HOST || ''
export const MAILER_USER = process.env.MAILER_USER || ''
export const MAILER_PASS = process.env.MAILER_PASS || ''
