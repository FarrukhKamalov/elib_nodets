import express, { Request, Response } from "express";
import userRouter from "./user/userRouter";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import bookRouter from "./book/bookRouter";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Welcome to elib api",
  });
});

// global error handler
app.use(globalErrorHandler);

app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);


export default app;
