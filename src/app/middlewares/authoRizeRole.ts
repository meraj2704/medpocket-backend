import { NextFunction, Request, Response } from "express"

export const authoRizeRole = (roles: string[]) => {
    return (req:Request, res:Response, next:NextFunction) => {
        if(!req.user){
            return res.status(401).json({message: "Unauthorized"});
        }

        if(!roles.includes(req.user.userRole)){
            return res.status(403).json({message: "Forbidden"});
        }

        next();
    }
}