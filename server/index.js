const express = require('express')
const mongoose = require("mongoose")
const product = require('./routes/product')
const cors = require('cors')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 2000
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGOOSE_URL,{
    dbName:"CraftersHub"
}).then(()=>{
    console.log("MongoDB connected");
}).catch((err)=>{
    console.log(err);
})

app.use('/product',product)


app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})
