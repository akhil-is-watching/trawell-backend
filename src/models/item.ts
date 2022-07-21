import mongoose, { Document, Schema } from 'mongoose';

export interface IItem {
    itemID: string;
    itemName: string;
    img: string;
    description: string;
    price: string;
}

export interface IItemModel extends IItem, Document {}

const ItemSchema: Schema = new Schema(
    {
        itemID: { type: String, required: true, unique: true },
        itemName: { type: String, required: true },
        img: { type: String, required: true },
        description: { type: String, required: true },
        location: { type: String, required: true },
        price: { type: Number, required: true }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IItemModel>('Item', ItemSchema);
