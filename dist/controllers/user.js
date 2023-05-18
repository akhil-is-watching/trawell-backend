"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import mongoose from 'mongoose';
const item_1 = __importDefault(require("../models/item"));
const purchases_1 = __importDefault(require("../models/purchases"));
const nanoid_1 = require("nanoid");
const buyItem = async (req, res, next) => {
    const { email, name, phone, itemID } = req.body;
    // itemIDs.forEach(async (itemID: any) => {
    const item = await item_1.default.findOne({ itemID: itemID });
    const purchase = new purchases_1.default({
        itemID: itemID,
        item: item,
        orderID: (0, nanoid_1.nanoid)(),
        email: email,
        name: name,
        phone: phone,
        date: Date.now(),
        lotteryID: (0, nanoid_1.nanoid)(),
        status: false
    });
    await purchase.save().then(() => res.status(200).send(itemID));
    // });
};
exports.default = { buyItem };
