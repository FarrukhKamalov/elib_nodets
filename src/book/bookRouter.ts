import { Router } from "express";
import {createBook} from "./bookController"
import multer from "multer";
import path from "path";


const bookRouter = Router();

const upload = multer({
    dest: path.resolve(__dirname, '../../public/data/uploads'),
    limits: {fileSize: 3e7} //30mb
})



bookRouter.post('/', upload.fields([
    {
        name: "coverImage",
        maxCount: 1
    },
    {
        name: 'file',
        maxCount: 1
    }
]), createBook);

bookRouter.patch('/');


bookRouter.delete('/')

export default bookRouter;