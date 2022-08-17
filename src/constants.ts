export const LOG_LEVELS: any = (process.env.LOG_LEVELS || 'debug,log,warn,error,verbose').split(',');
export const APPLICATION_PORT = process.env.AMAZON_APPLICATION_PORT || 3200;
export const MONGO_URL = process.env.AMAZON_APPLICATION_MONGO_URL || 'mongodb://localhost:27017/amazon-clone-db';
export const MONGO_USER = process.env.AMAZON_APPLICATION_MONGO_USER || 'amazon-root';
export const MONGO_PASS = process.env.AMAZON_APPLICATION_MONGO_PASS || 'amazon-root';
