import { Request, Response, NextFunction } from 'express';
import { Logging } from '../library/Logging';

// import mongoose from 'mongoose';
import Item from '../models/item';
import Purchase from '../models/purchases';
import { nanoid } from 'nanoid';

const buyItem = async (req: Request, res: Response, next: NextFunction) => {
    const { email, name, phone, itemID } = req.body;

    // itemIDs.forEach(async (itemID: any) => {
    const item = await Item.findOne({ itemID: itemID });

    const purchase = new Purchase({
        itemID: itemID,
        item: item,
        orderID: nanoid(),
        email: email,
        name: name,
        phone: phone,
        date: Date.now(),
        lotteryID: nanoid(),
        status: false
    });

    await purchase.save().then(() => res.status(200).send(itemID));
    // });
};

export default { buyItem };
