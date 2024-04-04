const cloudinary = require('cloudinary').v2
const fs = require('fs')
require('dotenv').config()


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (fileName)=>{
    try {
        if(!fileName) return null
    
        const response = await cloudinary.uploader.upload(fileName,{
            resource_type : "auto"
        })
        console.log("file uploaded on cloudinary ",response.url);
        fs.unlinkSync(fileName);
        return response
    } catch (error) {
        fs.unlinkSync(fileName)
        return null
    }
}

module.exports = {uploadOnCloudinary}
