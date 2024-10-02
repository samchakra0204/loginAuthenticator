const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/loginAuthenticator")
.then(() => {
    console.log("connected to database");
})
.catch(() => {
    console.log("failed to connect");
})

const logInSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const collection = mongoose.model("userdata", logInSchema);

module.exports = collection;