const Joi = require('joi');

// register validation
const registerValidation = (data) =>{
    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(8)
            .required(),
        phoneNumber: Joi.string()
            .min(6)
            .required(),
        fullName: Joi.string()
            .min(6)
            .required(),
        IPISS: Joi.string()
            .min(6)
            .required()
        
    });
    return schema.validate(data)
}

const loginValidation = data =>{
    const schema = Joi.object({
        
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    });
    return schema.validate(data)
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
