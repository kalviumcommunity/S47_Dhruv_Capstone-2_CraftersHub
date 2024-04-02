const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    ownerName :String,
    email : String,
    upi : String,
    contact : Number,
    category : String,
    material : String,
    description: String,
    pricec : Number,
    stock: Number,
    dimensions : String,
    weight : String,
    productImg : [{ type: String}],
    ownerImg : [{type : String}]
})

const productModel = mongoose.model("product",schema)

module.exports = {productModel}