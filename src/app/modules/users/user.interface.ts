import { Document, Types } from "mongoose";

export interface User {
    email:string;
    password:string;
    userRole:UserRole;
    name:String;
    phone:String;
    address:String;
}

export type UserRole = 'User' | 'Admin' | 'Super Admin';

export interface UserDocument extends User, Document {}