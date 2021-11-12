const router = require('express').Router();

// Models
const User = require('../model/User');

// Validation functions
const {registerValidation, loginValidation} = require('../validation');

// Dependencies
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Register
router.post('/register', async (req, res) => {
    
    // Data Validation
    const { error } = registerValidation(req.body);
    
    // If there's an error it will not create a new user
    if(error) {
        console.log(error.details[0].message)
        return res.status(400).send(error.details[0].message);
    }

    // Check if user is already registred
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) {
        console.log("This email already exists!")
        return res.status(400).send("This email already exists!");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Creating a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        console.log("Successfully created user");
        res.json({ user });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }

});

//Login
router.post('/login', async (req, res) => {

    // Data Validation
    const { error } = loginValidation(req.body);
    
    // If there's an error it will not log in
    if(error) {
        console.log(error.details[0].message);
        return res.status(400).send(error.details[0].message);
    }

    // Check if the email exists
    const user = await User.findOne({email: req.body.email});
    if(!user) {
        console.log("Email is wrong");
        return res.status(400).send("Email is wrong!");
    }

    // Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) {
        console.log("Password incorrect");
        return res.status(400).send("Password isn't valid!");
    }

    // Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).json({token});

});

module.exports = router;