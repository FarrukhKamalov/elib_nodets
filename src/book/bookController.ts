import { NextFunction, Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import path from "path";
import { MetadataFieldApiOptions } from './../../node_modules/cloudinary/types/index.d';
import createHttpError from "http-errors";

const createBook = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {} = req.body;

        console.log(req.files)

        const files = req.files as {
            [fieldname: string]: Express.Multer.File[]
        };
        const coverImageMimeType = files.coverImage[0].mimetype.split('/')[1];
        const fileName = files.coverImage[0].filename;
        const filePath = path.resolve(__dirname, '../../public/data/uploads/', fileName)
        
        const uploadResult = await cloudinary.uploader.upload(filePath, {
            public_id: fileName,
            folder: 'book-covers',
            format: coverImageMimeType
        })

        const bookFileName = files.file[0].filename;
        const bookFilePath = path.resolve(
            __dirname,
            '../../public/data/uploads/',
            bookFileName
        )


        const  bookFileUploadResult = await cloudinary.uploader.upload(bookFilePath, {
            resource_type: "raw",
            filename_override: bookFileName,
            folder: "book-pdfs",
            format: 'pdf'
        }) 
        console.log(" book upload result",bookFileUploadResult)


        console.log("upload result",uploadResult)
    } catch (error) {
        console.log(error)
        return next(createHttpError(500, 'Error while uploading the files.'))
    }
}


export {
    createBook
}