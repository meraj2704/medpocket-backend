import { User } from "../modules/users/user.interface";

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}