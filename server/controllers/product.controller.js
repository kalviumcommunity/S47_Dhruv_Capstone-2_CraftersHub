const {productModel} = require('../models/product.model')
const {uploadOnCloudinary} = require('../utils/cloudinary')
class product{
    //Get request
    static GetData = async (req,res)=>{
        try {
            const products = await productModel.find({})
            return res.json(products)
    
        } catch (error) {
            console.log(error);
        }
    }


    static PostData = async (req,res)=>{
        try {
            const {productImg,ownerImg} = req.files
            const newData = req.body
            
            if (!productImg || !ownerImg) {
                return res.status(400).json({ error: 'Product image or owner image is missing' });
            }
            const productImgUrlResponse = productImg.map(file=>uploadOnCloudinary(file.path))
            const ownerImgUrlResponse = ownerImg.map(file=>uploadOnCloudinary(file.path))

            const productImagePromise = await Promise.all(productImgUrlResponse)
            const ownerImagePromise = await Promise.all(ownerImgUrlResponse)

            const productImageUrl = productImagePromise.map(res=>res.url)
            const ownerImageUrl = ownerImagePromise.map(res=>res.url)

            newData.productImg = productImageUrl
            newData.ownerImg = ownerImageUrl

            await productModel.create(newData)
            console.log(newData);
            res.json(newData)

        } catch (error) {
            console.log(error);
        }
    }

    //GetById request
    static GetDataById = async (req,res)=>{
        try {
            const id = req.params.id
            const filterData = await productModel.findById(id)
            res.json(filterData)
        } catch (error) {
            console.log(error);
        }
    }

    //Put request
    static PutData = async (req,res)=>{
        try {
            const modifiedData = req.body
            //Put
            const id = req.params.id
            await productModel.findByIdAndUpdate(id, modifiedData)
            res.json(modifiedData)
        } catch (error) {
            console.log(error);
        }
    }

    //Delete request
    static DeleteData = async (req,res)=>{
        const id = req.params.id
        await productModel.findByIdAndDelete(id)
        res.send("Delete successfully")
    }
}

module.exports = product