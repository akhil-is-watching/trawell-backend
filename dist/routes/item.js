"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const item_1 = __importDefault(require("../controllers/item"));
const router = express_1.default.Router();
router.get('/allItems', item_1.default.allItems);
router.post('/addItem', item_1.default.addItem);
router.get('/purchases', item_1.default.itemPurchases);
router.get('/allPurchases', item_1.default.allPurchases);
exports.default = { router };
