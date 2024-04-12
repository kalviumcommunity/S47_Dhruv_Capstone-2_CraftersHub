const {userModel} = require('../models/user.model')


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
            await userModel.findByIdAndUpdate(id, modifiedData)
            res.json(modifiedData)
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {User}