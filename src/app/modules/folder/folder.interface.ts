import mongoose from "mongoose";

export interface IFolder {
    user_id: mongoose.Schema.Types.ObjectId;
    name:string;
    parentFolder_id?: mongoose.Schema.Types.ObjectId;
    path:string;
    date:string;
}