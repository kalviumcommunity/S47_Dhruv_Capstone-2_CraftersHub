const express = require('express')
const mongoose = require("mongoose")
const product = require('./routes/product')
const auth = require('./routes/auth')
const cors = require('cors')
const app = express()
const passport = require('passport')
const expressSession = require('express-session')
require('dotenv').config()
const port = process.env.PORT || 2000

app.use(express.json())
app.use(cors())
auth.use(expressSession({secret:"Dhruv@1184", resave:false, saveUninitialized:false}))
auth.use(passport.initialize())
auth.use(passport.session())
mongoose.connect(process.env.MONGOOSE_URL,{
    dbName:"CraftersHub"
}).then(()=>{
    console.log("MongoDB connected");
}).catch((err)=>{
    console.log(err);
})

app.use('/product',product)
app.use('/',auth)


app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})
