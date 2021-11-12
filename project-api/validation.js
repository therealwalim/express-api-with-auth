const Joi = require('joi');

// Register Validation
const registerValidation = (data) => {

    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(10).max(255).required().email(),
        password: Joi.string().min(8).required()
    });
    console.log("Validating registration");
    return schema.validate(data);
};

// Login Validation
const loginValidation = (data) => {

    const schema = Joi.object({
        email: Joi.string().min(10).max(255).required().email(),
        password: Joi.string().min(8).required()
    });
    
    return schema.validate(data);
};

// Post Validation
const postValidation = (data) => {

    const schema = Joi.object({
        title: Joi.string().min(1).required(),
        description: Joi.string().min(5).required(),
        content: Joi.string().min(20).required()
    });
    
    return schema.validate(data);
};


// Modules exports
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.postValidation = postValidation;
