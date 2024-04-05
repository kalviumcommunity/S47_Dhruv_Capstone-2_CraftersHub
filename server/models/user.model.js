const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    username : String,
    contact : String,
    address : String,
    password : String,
    ownerImg : [{typem: String}]
})

const userModel = mongoose.model('user',userSchema)

module.exports = {userModel}