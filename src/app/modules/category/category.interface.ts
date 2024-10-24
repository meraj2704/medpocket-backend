import { Document } from "mongoose";

export interface ICategory extends Document{
    name:string;
    description:string;
    image_url?:string;
    image_file_name?:string;
}