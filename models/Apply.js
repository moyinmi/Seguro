const mongoose = require("mongoose");

const ApplySchema = new mongoose.Schema( {
    firstName: {
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required: true
    },
    passport: {
        type:String,
        required: true
    },
    thirdName:{
        type:String,
        required: true
    },
    rank: {
        type:String,
        required: true
    },
    gender: {
        type:String,
        required: true
    },
    dateOfBirth: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required: true
    },
    phoneNumber:{
        type:String,
        required: true
    },
    address:{
        type:String,
        required: true
    },
    city: {
        type:String,
        required: true
    },
    state: {
        type:String,
        required: true
    },
    nextOfKin: {
        type:String,
        required: true
    },
    nextOfKinNo: {
        type:Number,
        required: true
    },
    dateOfEnlistment: {
        type:String,
        required: true
    },
    dateOfRetirement: {
        type:String,
        required: true
    },
    ippisNo: {
        type:Number,
        required: true
    },
    apNo: {
        type:Number,
        required: true
    },
    forceNo: {
        type:Number,
        required: true
    },
    mss: {
        type:Number,
        required: true
    },
    salary: {
        type:Number,
        required: true
    },
    amount: {
        type:Number,
        required: true
    },
    duration: {
        type:Number,
        required: true
    },
    bank: {
        type:String,
        required: true
    },
    accountNumber: {
        type:Number,
        required: true
    },
    accountName: {
        type:String,
        required: true
    },
    bvn: {
        type:Number,
        required: true
    },
    bankCode: {
        type:Number,
        required: true
    },
    
    },
{
    timestamps : true
}

)

module.exports = mongoose.model("Apply", ApplySchema);