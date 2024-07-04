import { NextFunction, Request, Response } from "express";
import { body , ValidationChain, validationResult } from "express-validator";

export const validate=(validations : ValidationChain[]) => {                       //verify the validation function defined downside
    return async (req:Request,res:Response,next:NextFunction) => {
        for(let validation of validations){
            const result=await validation.run(req);
            if(!result.isEmpty()){
                break;
            }
        }
        const errors=validationResult(req);  //it verify whether there was any erroe or not such that we can move to next middleware
        if(errors.isEmpty()){
          return  next();   //to move to next middleware to store the data
           
        }
       return  res.status(422).json({errors:errors.array()});    //unprocessable  data entity
    };
}; 


export const loginValidator = [
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password").trim().isLength({min:6}).withMessage("Password should contain atleast 6 characters"),

];

export const signupValidator = [
    body("name").notEmpty().withMessage("name is required"),
    ...loginValidator,

];


export const chatCompletionValidator = [
    body("message").notEmpty().withMessage("Message is required"),
    

];



