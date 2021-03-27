const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose= require("mongoose");

const userRoutes = require("./routes/userRoutes");
const HttpError = require("./util/http-error-message");

app.use(bodyParser.json());

app.use('/api/user',userRoutes);

app.use((req,res,next) => {
    next(new HttpError("Could not find the route",404));
})

app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({message:error.message || "Something went wrong"});
})

mongoose
    .connect("mongodb+srv://admin-jaydev:jd@123@cluster0.xnmjn.mongodb.net/byjus?retryWrites=true&w=majority",{ useUnifiedTopology: true , useNewUrlParser: true })
    .then(() => {
        app.listen(5000,function(){
            console.log("Server is open at port 5000");
        })
    })
    .catch((err) => {
        console.log(err);
    })