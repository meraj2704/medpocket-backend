import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../modules/users/user.models'; // Adjust the import path as necessary

interface JwtPayload {
    userId: string;
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    try {
        console.log(`Token received: ${token}`); // Log the token to verify it
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.sendStatus(404); // User not found
        }

        req.user = user; // Attach user to request object
        next();
    } catch (err) {
        console.error(err); // Log the error for more details
        return res.sendStatus(403); // Forbidden
    }
};
