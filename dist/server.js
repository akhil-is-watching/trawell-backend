"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const Logging_1 = require("./library/Logging");
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const item_1 = __importDefault(require("./routes/item"));
const user_1 = __importDefault(require("./routes/user"));
const router = (0, express_1.default)();
mongoose_1.default.connect(config_1.config.mongo.url, { retryWrites: true, w: 'majority' }).then(() => {
    Logging_1.Logging.info('Connected to DB');
    startServer();
});
const startServer = () => {
    /** Log the request */
    router.use((req, res, next) => {
        /** Log the req */
        Logging_1.Logging.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            /** Log the res */
            Logging_1.Logging.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
        });
        next();
    });
    /** MIDDLEWARE */
    router.use(express_1.default.urlencoded({ extended: true }));
    router.use(express_1.default.json());
    router.use((0, cors_1.default)());
    /** ROUTES */
    router.use(item_1.default.router);
    router.use(user_1.default.router);
    /** healthcheck */
    router.get('/ping', (req, res, next) => {
        res.status(200).json({ message: 'Still Alive!!' });
    });
    /** Error Handling */
    router.use((req, res, next) => {
        const error = new Error('not found');
        Logging_1.Logging.error(error);
        return res.status(404).json({ message: error.message });
    });
    http_1.default.createServer(router).listen(config_1.config.server.port, () => Logging_1.Logging.info(`Server is running on http://localhost:${config_1.config.server.port}.`));
};
