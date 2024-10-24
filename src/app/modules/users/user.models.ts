import { model, Schema } from "mongoose";
import { UserDocument } from './user.interface';

const UserSchema = new Schema<UserDocument>({
    email: {type:String, required:true, unique:true},
    password : {type:String, required:true},
    name : {type:String, required:true},
    phone : {type:String, required:true},
    address : {type:String},
    userRole: {type:String, required:true, enum:['User','Admin','Super Admin'], default:'User'}
})

export default model<UserDocument>('User', UserSchema)