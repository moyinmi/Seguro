const mongoose = require("mongoose");
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
    fullName: {
        type:String,
        required: true,
        min: 3,
        max:30,
        
    },
    email: {
        type: String,
        required: true,
        max: 250,
        unique: true
        
    },
    password :{
        type:String,
        required: true,
        min:8, 

    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    Otp: {
        type:String 
    },
    phoneNumber: {
        type: String,
        required: true,
        max: 20,
        
    },
    IPISS: {
        type: String,
        required:true,
        
    }
}
);

UserSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
  
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
  
    console.log({ resetToken }, this.passwordResetToken);
  
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  
    return resetToken;
  };

module.exports = mongoose.model("User", UserSchema)

