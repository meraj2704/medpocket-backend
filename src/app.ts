import express, { Application, Request, Response, NextFunction } from "express";
import connectDB from "./db";
import cors from "cors";
import logRoutes from "./app/middlewares/logRoutes";
import errorHandler from "./app/middlewares/global.error";
import { healthRouter } from "./app/modules/healthInfo/health.routes";
import { authRouter } from "./app/modules/auth.ts/auth.routes";
import { userRouter } from "./app/modules/user/user.route";
import reportRouter from "./app/modules/reports/reports.route";
import homeRouter from "./app/modules/home/home.route";
import { FolderRouter } from "./app/modules/folder/folder.route";

const app: Application = express();
const PORT = process.env.PORT || 4040;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
connectDB();
// Route
app.get("/", (req: Request, res: Response) => {
  console.log("hit on /");
  res.json({ message: "This is base URL for Med Pocket Backend" });
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/health", healthRouter);
app.use("/api/report", reportRouter);
app.use("/api/home", homeRouter);
app.use("/api/folder", FolderRouter);

logRoutes(app);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
export default app;
