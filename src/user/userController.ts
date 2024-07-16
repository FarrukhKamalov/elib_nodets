import { NextFunction, Request, response, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt";
import { config } from "../config/config";
import { sign, verify } from "jsonwebtoken";

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    const error = createHttpError(400, "All fields are required");
    return next(error);
  }

  try {
    const user = await userModel.findOne({ email });

    if (user) {
      const error = createHttpError(
        "400",
        "User already exists with this email"
      );

      return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = sign({ id: newUser._id }, config.SECRET_KEY as string, {
      expiresIn: "7d",
      algorithm: "HS256",
    });

    res.json({ message: "User created", data: token });
  } catch (err) {
    return next(createHttpError(500, "Error while getting user"));
  }
};



const loginUser = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, password} = req.body;

        if(!email || !password ) {
            const error = createHttpError(400, "All fields are required");
            return next(error);
        }

        const user = await userModel.findOne({email})
        if(!user){
            const error = createHttpError(404, "user not found!")
            return next(error)
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return next(createHttpError(400, "Username or Password incorrect"))
        }

        const token = sign({id: user._id}, config.SECRET_KEY as string, {
            expiresIn: "7d",
            algorithm: 'HS256'
        })

        res.json({
            accessToken: token
        })
    } catch (error) {
        console.log(error)
    }
}
export { registerUser, loginUser };
