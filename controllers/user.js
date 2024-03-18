const User=require('../models/user')
const {v4: uuidv4} = require('uuid');
const {setUser} = require('../service/auth')
async function handleUserSignuUp(req, res){
    const {name, email, password}=req.body;
    const emailRegex = /^[a-zA-Z0-9._-]{3,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
        return res.render('signup', {
            error: "Invalid email format",
        });
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.render('signup', {
            error: "Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and must be at least 8 characters long",
        });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.render('signup', {
            error: "Email already exists. Please choose a different email address.",
        });
    }
    await User.create({
        name, 
        email, 
        password,
    });
    return res.render("login", {
        success:"Account created successfully!"
    });
}

async function handleUserLogin(req, res){
    const {email, password}=req.body;
    const user = await User.findOne({email, password,});
    if(!user)
        return res.render('login', {
        error:"Invalid Username and password",
    });
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie('uid', sessionId);
    return res.redirect("/");
}
module.exports={
    handleUserSignuUp,
    handleUserLogin,
}