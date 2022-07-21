import express from 'express';
import controller from '../controllers/user';

const router = express.Router();

router.post('/buyItem', controller.buyItem);

export default { router };
