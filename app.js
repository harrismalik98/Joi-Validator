const express = require("express");
const {validateSignup} = require("./validator")
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.post("/signup", (req,res,next) => {
    const {error} = validateSignup(req.body);

    if(error){
        // res.send(error); // This contain => original values + details.
        // res.send(error.details); // This is an array of objects and every object has error message.
        // return next(error);

        const errorMessages = error.details.map(err => err.message);
        const errorMessage = errorMessages.join("\n");
        return res.status(400).send(errorMessage);

        // res.json({ERROR:errorMessages});
    }

    return res.send("User registered successfully");
})

app.listen(3000, ()=> {
    console.log("App running at port 3000");
});