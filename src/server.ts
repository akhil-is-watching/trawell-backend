import express from 'express';
import http from 'http';
import cors from 'cors';
import { Logging } from './library/Logging';
import mongoose from 'mongoose';
import { config } from './config/config';

import itemRoutes from './routes/item';
import userRoutes from './routes/user';

const router = express();

mongoose.connect(config.mongo.url, { retryWrites: true, w: 'majority' }).then(() => {
    Logging.info('Connected to DB');
    startServer();
});

const startServer = () => {
    /** Log the request */
    router.use((req, res, next) => {
        /** Log the req */
        Logging.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            /** Log the res */
            Logging.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
        });

        next();
    });
    /** MIDDLEWARE */
    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());
    router.use(cors({ origin: '*' , credentials :  true}));

    /** ROUTES */

    router.use(itemRoutes.router);
    router.use(userRoutes.router);

    /** healthcheck */
    router.get('/ping', (req, res, next) => {
        res.status(200).json({ message: 'Still Alive!!' });
    });

    /** Error Handling */
    router.use((req, res, next) => {
        const error = new Error('not found');
        Logging.error(error);

        return res.status(404).json({ message: error.message });
    });

    http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on http://localhost:${config.server.port}.`));
};
