import User from "../models/User.js";
import { hash, compare } from 'bcrypt';
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";
// Get All User
export const getAllUsers = async (req, res, next) => {
    //get all users from backend
    try {
        const users = await User.find();
        return res.status(200).json({ message: "OK", users }); //A 200 status code in HTTP means "OK." It indicates that the request has succeeded
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
//User Signup
export const UserSignup = async (req, res, next) => {
    //get all users from backend
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await hash(password, 10); //encrypted password
        const existingUser = await User.findOne({ email }); //checking if the user is already present
        if (existingUser)
            return res.status(401).send("User already Registered");
        const user = new User({ name, email, password: hashedPassword }); //new user created with post data
        await user.save(); //for creating and saving new user in database
        //CREATE TOKEN AND STORE COOKIE
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        return res.status(201).json({ message: "OK", name: user.name, email: user.email }); //A 201 status code in HTTP means "Created." It indicates that the request has been successfully fulfilled and has resulted in the creation of a new resource
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
//User Login
export const UsersLogin = async (req, res, next) => {
    //get all users from backend
    try {
        //user login
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user)
            return res.status(401).send("User not Registered"); //A 401 status code in HTTP means "Unauthorized."
        const isPasswordcorrect = await compare(password, user.password);
        if (!isPasswordcorrect) {
            return res.status(403).send("Incorrect Password"); //403 - Forbidden
        }
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        return res.status(200).json({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const verifyUser = async (req, res, next) => {
    //get all users from backend
    try {
        // user token check
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not Registered OR Token malfunctioned");
        } //A 401 status code in HTTP means "Unauthorized."
        console.log(user._id.toString(), res.locals.jwtData.id);
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match ");
        }
        return res.status(200).json({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const userLogout = async (req, res, next) => {
    //get all users from backend
    try {
        // user token check
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not Registered OR Token malfunctioned");
        } //A 401 status code in HTTP means "Unauthorized."
        console.log(user._id.toString(), res.locals.jwtData.id);
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match ");
        }
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });
        return res.status(200).json({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=user-controllers.js.map