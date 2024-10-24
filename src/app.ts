import express, { Application, Request, Response, NextFunction } from 'express';
import connectDB from './db';
import cors from 'cors';
import { userRouter } from './app/modules/users/user.routes';
import { categoryRouter } from './app/modules/category/category.routes';
import { foodRouter } from './app/modules/foods/food.routes';
import { authRouter } from './app/modules/auth.ts/auth.routes';
import { orderRouter } from './app/modules/orders/order.routes';
import { uploadRouter } from './app/modules/multer/upload.routes';
import logRoutes from './app/middlewares/logRoutes';
import errorHandler from './app/middlewares/global.error';
import { bmi_router } from './app/modules/bmi/bmi.routes';


const app: Application = express();
const PORT = process.env.PORT || 4040;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
connectDB();


// Route
app.get('/', (req:Request, res:Response) => {
    console.log("hit on /")
    res.json({ message: 'This is base URL for Med Pocket Backend' });
})

// app.use('/api/auth', authRouter);
// app.use('/api', userRouter);
// app.use('/api', categoryRouter);
// app.use('/api', foodRouter );
// app.use('/api', orderRouter);
// app.use('/images', uploadRouter)


app.use('/api/',bmi_router)

logRoutes(app)
// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
export default app;