const {productModel} = require('../models/product.model')

class product{

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
            const newFiles = req.files
            const newData = req.body
            const productImage = []
            const ownerImage = []
            if(newFiles.productImg && newFiles.ownerImg){
                for(let i=0; i<newFiles.productImg.length;i++){
                    productImage.push(newFiles.productImg[i].filename)
                }
                for(let i=0; i<newFiles.ownerImg.length;i++){
                    ownerImage.push(newFiles.ownerImg[i].filename)
                }
                newData.productImg = productImage
                newData.ownerImg = ownerImage
            }
            await productModel.create(newData)
            console.log(newData);
            res.json(newData)

        } catch (error) {
            console.log(error);
        }
    }

    static GetDataById = async (req,res)=>{
        try {
            const id = req.params.id
            const filterData = await productModel.findById(id)
            res.json(filterData)
        } catch (error) {
            console.log(error);
        }
    }

    static PutData = async (req,res)=>{
        try {
            const id = req.params.id
            const modifiedData = req.body
            await productModel.findByIdAndUpdate(id, modifiedData)
            res.json(modifiedData)
        } catch (error) {
            console.log(error);
        }
    }

    static DeleteData = async (req,res)=>{
        const id = req.params.id
        await productModel.findByIdAndDelete(id)
        res.send("Delete successfully")
    }
}

module.exports = product