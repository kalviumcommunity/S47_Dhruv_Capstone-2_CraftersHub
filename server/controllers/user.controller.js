const {userModel} = require('../models/user.model')
const {uploadOnCloudinary} = require('../utils/cloudinary')

class User{
    //get request 
    static GetUser = async (req,res)=>{
        try {
            const data = await userModel.find({})
            res.json(data)
        } catch (error) {
            console.log(error);
        }
    }

    //GetById request
    static GetUserById = async (req,res)=>{
        try {
            const id = req.params.id
            const filterData = await userModel.findById(id)
            // console.log("Id Data",filterData);
            res.json(filterData)
        } catch (error) {
            console.log(error);
        }
    }

    //Put request
    static PutUser = async (req,res)=>{
        try {
            const id = req.params.id
            const modifiedData = req.body
            const file = req.file
            console.log("body",req.body);
            console.log("file",file);
            if(req.file){
                const {url} = await uploadOnCloudinary(file.path)
                // const ownerImagePromise = await Promise.all(ownerImgUrlResponse)
                // const ownerImageUrl = ownerImagePromise.url

                modifiedData.ownerImg = [url]
                // await userModel.findByIdAndUpdate(id, modifiedData,{new:true})
                // console.log("modiified data", modifiedData);
                // return res.json(modifiedData)
            }
            const updatedData = await userModel.findByIdAndUpdate(id, modifiedData,{new:true})
            console.log(updatedData);
            res.json(updatedData)
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {User}