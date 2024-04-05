const {userModel} = require('../models/user.model')
const localStategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const intializingPassport = (passport) =>{
    passport.use(new localStategy( async (username,password,done)=>{
        try {
            const user = await userModel.findOne({username})

            if (!user || !(await bcrypt.compare(password, user.password))) {
                return done(null, false);
            }

            return done(null,user)   
        } catch (error) {
            return done(error,false)
        }
    }))

    passport.serializeUser((user,done)=>{
        done(null,user.id)
    })

    passport.deserializeUser(async (id,done)=>{
        try {
            const user = await userModel.findById(id)
            done(null,user)
        } catch (error) {
            done(error,false)
        }
    })
} 

const routeProtector = (req,res,next)=>{
    console.log("protector",req.user);
    if(req.user) return next()

    res.status(401).send('Please login first')
}
module.exports = {intializingPassport , routeProtector}