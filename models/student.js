const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stdSchema = new Schema({
    fName : {
        type : String,
        required : true
    },
    lName : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    },
    contactNumber : {
        type : Number,
        required : true
    },
    gender : {
        type : String,
        required : true
    }
})

const student = mongoose.model("Student", stdSchema);

module.exports = student;