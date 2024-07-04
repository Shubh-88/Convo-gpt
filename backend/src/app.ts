//all of the application's code will be handled in the app.ts

import express from 'express';
import {config} from "dotenv";
import morgan from "morgan";
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from "cors"; 
config();

const app=express();   //app variable holds the responsiblility of express 

//middlewares
app.use(cors({origin: "http://localhost:5173" , credentials:true}));
app.use(express.json()); //is used to define middleware

app.use(cookieParser(process.env.COOKIE_SECRET));
//remove it in production
app.use(morgan("dev"));
app.use("/api/v1",appRouter);



export default app;
