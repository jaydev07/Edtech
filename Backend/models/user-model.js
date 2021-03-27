const mongoose = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({

    name: {type: "string" , required: true},

    email: {type: "string" , required: true , unique: true},

    password: {type: "string" , required: true , minLength:6},

    // className: {type: "string" , required: true},

    // school: {type: "string" , required: true}

});

userSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model("User",userSchema);