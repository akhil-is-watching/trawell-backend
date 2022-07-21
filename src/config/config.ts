import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.ocfb14d.mongodb.net/?retryWrites=true&w=majority`;

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;
// const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 3600;
// const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'WholeLand';
// const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || 'neversayever';

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
        // token: {
        //     expireTime: SERVER_TOKEN_EXPIRETIME,
        //     issuer: SERVER_TOKEN_ISSUER,
        //     secret: SERVER_TOKEN_SECRET
        // }
    }
};
