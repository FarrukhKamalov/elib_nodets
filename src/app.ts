import express, { Request, Response } from 'express';
import userRouter  from "./user/userRouter";
import globalErrorHandler from './middlewares/globalErrorHandler';
import bookRouter from './book/bookRouter';

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", (req: Request, res: Response)=>{
    res.json({
        message: "Welcome to elib api"
    });
})

app.use(globalErrorHandler)

app.use('/api/users', userRouter)
app.use('/api/books', bookRouter)
// global error handler



export default app;