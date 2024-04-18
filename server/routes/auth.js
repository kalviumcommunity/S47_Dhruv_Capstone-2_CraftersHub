const { intializingPassport, routeProtector } = require('../middleware/passport.middleware')
const { userModel } = require('../models/user.model')
const express = require('express')
const passport = require('passport')
const expressSession = require('express-session')
const bcrypt = require('bcryptjs')
const { User } = require('../controllers/user.controller')
const upload = require('../middleware/Files.middleware')
const auth = express()
// const cors = require('cors')
require('dotenv').config()


// auth.use(cors())
auth.use(express.json())
intializingPassport(passport)

auth.use(expressSession({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }))
auth.use(passport.initialize())
auth.use(passport.session())

auth.get('/ping', (req, res) => {
    res.send('Dhruv khandelwal')
})
auth.get('/user', async (req, res) => {
    try {
        const data = await userModel.find({})
        res.json(data)
    } catch (error) {
        res.status(401).send(error)
    }
})



auth.post('/login', passport.authenticate("local"
    , {
        failureRedirect: "/signup",
    }
), async (req, res) => {
    // console.log(req.body, req.user);
    try {
        if (req.user) {
            console.log("auth", req.user);
            req.session.user = req.user
            // res.redirect('/login/success')
            // next()
            res.json({ user: req.user })
        }
        else {
            console.log("auth fail");
            res.status(401).send('Authentication failed');
        }
    } catch (error) {
        console.log(error);
    }
    // },routeProtector,async(req,res)=>{
    //     console.log("login routeprotector",req.user);
    //     res.send('Success')
}
)

// auth.get('/login',(req,res)=>{
//     console.log("Login user ",req.user);
//     if(req.user){
//         res.redirect('/login/success')
//     }
//     res.send("user verified")
// })

auth.get('/auth/google', passport.authenticate("google", { scope: ["profile", "email"] }))


auth.get('/auth/google/callback', passport.authenticate("google", {
    successRedirect: "http://localhost:5173/",
    failureRedirect: "http://localhost:9000/login"
}))

auth.get('/login/success', async (req, res) => {
    try {
        const header = req.headers['authorization'];
        console.log("headers", header);
        console.log("login req.user:- ", req.user);

        let user
        if (header) {
            try {
                const id = header.replace("Bearer ", '')
                user = await userModel.findById(id)
                console.log("id", id);
                // console.log("id user", user);
            } catch (error) {
                console.log("error in find user", error);
            }
        }
        if (!user) {
            user = req.user
            console.log("user auth ",user);
        }
        console.log("user",user);
        if (user) {
            res.json({ user })
        } else {
            res.status(400).json({ message: "Not authenticated" })
        }
    } catch (error) {
        console.log(error);
    }
})

auth.get('/logout', (req, res, next) => {
    req.logOut(function (err) {
        if (err) {
            return next(err)
        }
        console.log("logout");
        res.redirect('http://localhost:5173/')
    })
})

// User routes
auth.get('/user',User.GetUser)

auth.get('/update/:id', User.GetUserById)

auth.post('/signup', User.PostUser)

auth.put('/update/:id', upload.single('ownerImg'), User.PutUser)

auth.post('/forgotPassword', User.ForgotPassword)

auth.post('/resetPassword/:id/:token', User.ResetPassword)

auth.post('/otpVerification', User.OTPVerification)
module.exports = auth