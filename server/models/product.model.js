const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    productName: String,
    ownerName :String,
    email : String,
    category : String,
    material : String,
    description: String,
    price : Number,
    stock: Number,
    dimensions : String,
    weight : String,
    productImg : [{ type: String}],
    ownerImg : [{type : String}]

    //createdAt, updatedAt
},{timestamps:true})

const productModel = mongoose.model("product",schema)

module.exports = {productModel}