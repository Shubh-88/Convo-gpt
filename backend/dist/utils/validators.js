import { body, validationResult } from "express-validator";
export const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req); //it verify whether there was any erroe or not such that we can move to next middleware
        if (errors.isEmpty()) {
            return next(); //to move to next middleware to store the data
        }
        return res.status(422).json({ errors: errors.array() }); //unprocessable  data entity
    };
};
export const loginValidator = [
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password").trim().isLength({ min: 6 }).withMessage("Password should contain atleast 6 characters"),
];
export const signupValidator = [
    body("name").notEmpty().withMessage("name is required"),
    ...loginValidator,
];
export const chatCompletionValidator = [
    body("message").notEmpty().withMessage("Message is required"),
];
//# sourceMappingURL=validators.js.map