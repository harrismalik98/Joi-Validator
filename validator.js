const Joi = require("joi");

const validator = (schema) => (payload) => schema.validate(payload,{abortEarly: false}); // abortEarly: false gives us all errors at once.



const signupSchema = Joi.object({
    email:Joi.string().email().message("Please enter valid Email").required(),
    password:Joi.string().min(4).max(30).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/)
    .message('Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character').required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({'any.only': 'Passwords do not match'}),
    address: {
        state:Joi.string().length(2).message("Address State length must be 2 characters long").required(),
    },
    DOB:Joi.date().greater(new Date(2000-01-01)).less(new Date()).message("DOB must be greater than 2000 and less than today's date").required(),
    active:Joi.boolean().required(),
    activeDetails:Joi.string().when("active", {
        is: true,
        then: Joi.string().min(3).max(30).required(),
        otherwise: Joi.string().optional(),
    }),
    hobbies: Joi.array().items(Joi.string(),Joi.number()),
    acceptTos: Joi.boolean().truthy("Yes").valid(true).required(), // If it's "Yes" then it true.Only valid value is "true" otherwise it's invalid
});

const validateSignup = validator(signupSchema);




module.exports = {validateSignup};


//===================> Place below JSON to Postman to check validation. <===================//
// {
//     "email":"mha@gmail.com",
//     "password":"Ha4$as",
//     "confirmPassword":"Ha4$as",
//     "address":{
//         "state": "Oh"
//     },
//     "DOB": "2001-01-01",
//     "active": "true",
//     "activeDetails":"yes",
//     "hobbies": ["harris", 3],
//     "acceptTos" : "Yes"
// }