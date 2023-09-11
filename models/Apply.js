const mongoose = require("mongoose");

const ApplySchema = new mongoose.Schema( {
    firstName: {
        type:String,
        required: true
    },
    lastName: {
        type:String,
        max:50,
        required:true,
    },
    middleName: {
        type:String,
        max:50,
        required:true,
    },
    email: {
        type:String,
        max:50,
        required:true,
    },
    passport : {
        type: String,
        required:true,
    },
    phoneNumber : {
        type: String,
        required:true,
    },
    gender : {
        type: String,
        required:true,
    },
    dateOfBirth : {
        type: String,
        required:true,
    },
    rank : {
        type: String,
        required:true,
    },
    address : {
        type: String,
        required:true,
    },
    city : {
        type: String,
        required:true,
    },
    state : {
        type: String,
        required:true,
    },
    
    },
{
    timestamps : true
}

)

module.exports = mongoose.model("Apply", ApplySchema);