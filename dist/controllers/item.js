"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nanoid_1 = require("nanoid");
const item_1 = __importDefault(require("../models/item"));
const purchases_1 = __importDefault(require("../models/purchases"));
const allItems = async (req, res, next) => {
    const items = await item_1.default.find();
    if (items) {
        res.status(200).send(items);
    }
    else {
        res.status(500).send({ message: 'Internal Server ERROR' });
    }
};
const addItem = async (req, res, next) => {
    const { itemName, description, img, price, location } = req.body;
    const ItemID = (0, nanoid_1.nanoid)();
    const itemAdded = new item_1.default({
        itemID: ItemID,
        itemName: itemName,
        description: description,
        location: location,
        img: img,
        price: price
    });
    await itemAdded.save();
    res.status(200).send({ message: 'Item added' });
};
const itemPurchases = async (req, res, next) => {
    const { itemID } = req.body;
    const purchases = await purchases_1.default.find({ itemID: itemID });
    if (purchases) {
        res.status(200).send(purchases);
    }
    else {
        res.status(500).send({ message: 'Internal Server Error' });
    }
};
const editItem = async (req, res, next) => {
    const { itemID, itemName, img, date, ticketPrice } = req.body;
    const change = await item_1.default.findByIdAndUpdate({ itemID: itemID }, {
        itemName: itemName,
        img: img,
        date: date,
        ticketPrice: ticketPrice
    }, {
        new: true,
        upsert: true
    });
    if (change) {
        res.status(200).send({ message: 'Item Edited' });
    }
    else {
        res.status(500).send({ message: 'Internal Server Error' });
    }
};
const allPurchases = async (req, res, next) => {
    const purchases = await purchases_1.default.find();
    if (purchases) {
        res.status(200).send(purchases);
    }
};
exports.default = { allItems, addItem, itemPurchases, editItem, allPurchases };
