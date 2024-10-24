import { Document, Types } from "mongoose";

export interface IFoods extends Document{
    name:string;
    price:number;
    category_id:Types.ObjectId;
    category_name:string;
    quantity:number;
    unit:string;
    description:string;
    image_url?:string;
}

export interface IFindFood {
    name?: string;
}