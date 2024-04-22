const express = require('express')
const mongoose = require("mongoose")
const product = require('./routes/product')
const auth = require('./routes/auth')
const cors = require('cors')
const app = express()
// const passport = require('passport')
// const expressSession = require('express-session')
require('dotenv').config()
const port = process.env.PORT || 2000

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true 
  };
  app.use(cors(corsOptions))
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }));
  
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
