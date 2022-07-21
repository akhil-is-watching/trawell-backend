import { Request, Response, NextFunction } from 'express';
import { Logging } from '../library/Logging';

import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

import Item from '../models/item';
import Purchase from '../models/purchases';

const allItems = async (req: Request, res: Response, next: NextFunction) => {
    const items = await Item.find();
    if (items) {
        res.status(200).send(items);
    } else {
        res.status(500).send({ message: 'Internal Server ERROR' });
    }
};

const addItem = async (req: Request, res: Response, next: NextFunction) => {
    const { itemName, description, img, price, location } = req.body;
    const ItemID = nanoid();

    const itemAdded = new Item({
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

const itemPurchases = async (req: Request, res: Response, next: NextFunction) => {
    const { itemID } = req.body;

    const purchases = await Purchase.find({ itemID: itemID });

    if (purchases) {
        res.status(200).send(purchases);
    } else {
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

const editItem = async (req: Request, res: Response, next: NextFunction) => {
    const { itemID, itemName, img, date, ticketPrice } = req.body;

    const change = await Item.findByIdAndUpdate(
        { itemID: itemID },
        {
            itemName: itemName,
            img: img,
            date: date,
            ticketPrice: ticketPrice
        },
        {
            new: true,
            upsert: true
        }
    );

    if (change) {
        res.status(200).send({ message: 'Item Edited' });
    } else {
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

const allPurchases = async (req: Request, res: Response, next: NextFunction) => {
    const purchases = await Purchase.find();

    if (purchases) {
        res.status(200).send(purchases);
    }
};

export default { allItems, addItem, itemPurchases, editItem, allPurchases };
