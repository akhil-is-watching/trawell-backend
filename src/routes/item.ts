import express from 'express';
import controller from '../controllers/item';

const router = express.Router();

router.get('/allItems', controller.allItems);
router.post('/addItem', controller.addItem);
router.get('/purchases', controller.itemPurchases);
router.get('/allPurchases', controller.allPurchases);

export default { router };
