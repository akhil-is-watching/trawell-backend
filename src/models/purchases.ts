import mongoose, { Document, Schema } from 'mongoose';
import { Tracing } from 'trace_events';

export interface IPurchase {
    itemID: String;
    item: {
        itemID: String;
        itemName: String;
        img: String;
        description: String;
        location: String;
        price: Number;
    };
    orderID: String;
    email: String;
    name: String;
    phone: String;
    date: Date;
    status: Boolean;
}

export interface IPurchaseModel extends IPurchase, Document {}

const PurchaseSchema: Schema = new Schema(
    {
        itemID: { type: String, required: true },
        item: {
            itemID: String,
            itemName: String,
            img: String,
            description: String,
            location: String,
            price: Number
        },
        orderID: { type: String, require: true },
        email: { type: String, required: true, lowercase: true },
        name: { type: String, required: true },
        phone: { type: String, required: true },
        date: { type: Date, required: true },
        status: { type: Boolean, default: false }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IPurchaseModel>('Purchase', PurchaseSchema);
