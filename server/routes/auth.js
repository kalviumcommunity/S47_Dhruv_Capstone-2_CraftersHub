const  {intializingPassport, routeProtector} = require('../middleware/passport.middleware')
const {userModel} = require('../models/user.model')
const express = require('express')
const passport = require('passport')
const expressSession = require('express-session')
const bcrypt = require('bcryptjs')
const auth = express()
auth.use(express.json())
intializingPassport(passport)
auth.use(expressSession({secret:"Dhruv@1184", resave:false, saveUninitialized:false}))
auth.use(passport.initialize())
auth.use(passport.session())

auth.get('/ping',routeProtector,(req,res)=>{
    res.send('Dhruv khandelwal')
})
auth.get('/user',async (req,res)=>{
    try {
        const data = await userModel.find({})
        res.json(data)
    } catch (error) {
        res.status(401).send(error)
    }    
})

auth.post('/signup',async (req,res)=>{
    try {
        const {name,username,password} = req.body

        if(!(name || username || password)){
            res.status(400).send('All input required')
        }
        const existUser = await userModel.findOne({username})
        if(existUser){
            res.status(400).send("User Already Exist. Please Login")
        }else{
            const hashedPassword = await bcrypt.hash(password,10)

            const newUser = await userModel.create({
                name,
                username,
                password: hashedPassword
            })
            res.json(newUser)
        }
    } catch (error) {
        console.log(error);
    }
})

auth.post('/login',passport.authenticate('local'),async (req,res)=>{
    try {
        if(req.isAuthenticated()){
            res.json(req.user)

        }
        else{
            res.status(401).send('Authentication failed');
        }
        // console.log(req.user);
    } catch (error) {
        console.log(error);
    }
})

module.exports = auth