const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const sendEmail = require('./../email'); // Import your Nodemailer configuration
const fs = require('fs');
const path = require('path');
const {registerValidation, loginValidation} = require('../validation')



router.post('/register', async (req, res) =>{   // response gotten from the user can be validated

// Validate the data before a user is created
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //checking if the user is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(200).send({ message: 'Email already exists' });

    // hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create a new user
    const user = new User ({
        fullName: req.body.fullName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber ,
        IPISS: req.body.IPISS,
        password: hashedPassword
    });
    try{
    const savedUser = await user.save();

      // Load the email template
        const emailTemplatePath = path.join(__dirname, 'email-templates', 'signup-successful.html');
        const emailTemplate = fs.readFileSync(emailTemplatePath, 'utf-8');
                

    await sendEmail({
        email: user.email,
        subject: 'Welcome to Seguro',
        message: 'Thank you for signing up for Seguro',
        html: emailTemplate,
      });

        // res.send(savedUser); sends all the info of the saved user
        res.status(200).json({
            success: true,
            user: user._id,
          });
          
    }catch (err) {
        console.error('Error:', err);
        if (err && err.details && err.details[0]) {
          // If err, err.details, and err.details[0] are defined, send the error message
          res.status(400).send(err.details[0].message);
        } else {
          // If any of the above properties are undefined, send a generic error message
          res.status(400).send({ message: 'An error occurred' });
        }
    }
      
    });


//LOGIN
router.post('/login', async (req, res) =>{
    const {error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)

        //checking if the Email exist
        const user = await User.findOne({email: req.body.email});
        if (!user) return res.status(400).send({ message: 'Email is not found' });
;

        //password is correct
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if(!validPass) return res.status(400).send({ message: 'Invalid Password' })

        //create and assign a token
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        res.status(200)
   .header('auth-token', token)
   .json({
      success: true,
      user: user._id,
   });

        

});


router.post('/forgotPassword', async (req, res, next) => {
    try {
      // 1) Get user based on POSTed email
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({
          status: 'error',
          message: 'No user found with that email address.',
        });
      }

       //generate otp

       function generateOTP() {
         const otp = Math.floor(1000 + Math.random() * 9000).toString();
         const now = new Date();
         const expires = new Date(now.getTime() + 10 * 60 * 1000);  //10 minutes from now
         return { otp, expires };
       }
      
       const otpData = generateOTP();  //Generate OTP with expiration time
       user.Otp = otpData.otp
       await user.save()

        // Load the email template
        const emailTemplatePath = path.join(__dirname, 'email-templates', 'otp.html');
        const emailTemplate = fs.readFileSync(emailTemplatePath, 'utf-8');
                
  
       const message = `Your OTP code is ${otpData.otp}`
      await sendEmail({
        email: user.email,
        subject: 'Your OTP',
        message,
        html: emailTemplate
      });
  
      res.status(200).json({
        success: true ,
        message: 'Password reset OTP sent to your email.',
      });
    } catch (err) {
      console.error('Error in forgotPassword:', err);
  
      // Handle errors and provide detailed error messages
      if (err.name === 'ValidationError') {
        return res.status(400).json({
          success: false,
          message: 'Invalid data submitted. Please check your email address.',
        });
      }
  
      // Handle other unexpected errors
      return res.status(500).json({
        status: 'error',
        message: 'There was an error sending the email. Please try again later.',
      });
    }
  });

    
  router.patch('/resetPassword', async (req, res, next) => {
    try {
      const { email, otp, newPassword, confirmPassword } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });
  
      // Check if the OTP provided matches the one stored in the user's document
      if (user.Otp !== otp) {
        return res.status(400).json({
          success: false,
          message: 'Invalid OTP. Please try again.',
        });
      }
  
      // Check if the new password and confirm password match
      if (newPassword !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message: 'New password and confirm password do not match.',
        });
      }

      // hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
  
      // Update the user's password
      user.password = hashedPassword;
      user.otp = undefined; // Clear the OTP field
      await user.save();
  
      // Respond with a success message
      return res.status(200).json({
        success: true,
        message: 'Password successfully reset.',
      });
    } catch (err) {
      console.error('Error in resetPassword:', err);
  
      // Handle errors and provide detailed error messages
      if (err.name === 'ValidationError') {
        return res.status(400).json({
          success: false,
          message: 'Invalid data submitted. Please check your input.',
        });
      }
  
      // Handle other unexpected errors
      return res.status(500).json({
        success: false,
        message: 'An error occurred while resetting the password. Please try again later.',
      });
    }
  });

//get a user
router.get("/:id", async (req,res) => {
    try{
        const user = await User.findById(req.params.id);
        const {password, updatedAt, ...other} = user._doc //hides the password from being seen
        res.status(200).json(other)
    } catch(err) {
        return res.status(500).json(err)
    }
});
  


module.exports = router;