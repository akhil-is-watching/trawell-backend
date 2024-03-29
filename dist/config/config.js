"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_URL = process.env.MONGO_URL || "";
const PORT = process.env.PORT ? Number(process.env.PORT) : 1337;
// const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 3600;
// const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'WholeLand';
// const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || 'neversayever';
exports.config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: PORT
        // token: {
        //     expireTime: SERVER_TOKEN_EXPIRETIME,
        //     issuer: SERVER_TOKEN_ISSUER,
        //     secret: SERVER_TOKEN_SECRET
        // }
    }
};
