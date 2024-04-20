const { userModel } = require('../models/user.model')
const { uploadOnCloudinary } = require('../utils/cloudinary')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcryptjs')
const { ForgetPasswordMail, otpSignUp, generatedOtp } = require('../utils/nodeMailer')

class User {
    //get request 
    static GetUser = async (req, res) => {
        try {
            const data = await userModel.find({})
            res.json(data)
        } catch (error) {
            console.log(error);
        }
    }


    //Post request 
    static PostUser = async (req, res) => {
        try {
            const { name, username, password, otp, validOtp } = req.body

            if (!(name || username || password || otp)) {
                return res.status(400).send('All input required')
            }
            if (validOtp == otp) {
                const existUser = await userModel.findOne({ username })
                if (existUser) {
                    return res.status(400).send("User Already Exist. Please Login")
                } else {
                    const hashedPassword = await bcrypt.hash(password, 10)

                    const newUser = await userModel.create({
                        name,
                        username,
                        password: hashedPassword
                    })
                    res.json(newUser)
                }
            } else {
                res.status(400).json({ message: "Invalid OTP" })
            }
        } catch (error) {
            console.log(error);
        }
    }
    //GetById request
    static GetUserById = async (req, res) => {
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
    static PutUser = async (req, res) => {
        try {
            const id = req.params.id
            const modifiedData = req.body
            const file = req.file
            console.log("body", req.body);
            console.log("file", file);
            if (req.file) {
                const { url } = await uploadOnCloudinary(file.path)

                modifiedData.ownerImg = [url]
            }
            const updatedData = await userModel.findByIdAndUpdate(id, modifiedData, { new: true })
            console.log(updatedData);
            res.json(updatedData)
        } catch (error) {
            console.log(error);
        }
    }

    // Post Forget password 
    static ForgotPassword = async (req, res) => {
        try {
            const { username } = req.body
            console.log(username);
            const findUser = await userModel.findOne({ username })
            if (!findUser) {
                return res.status(400).json({ message: "User not exist" })
            }
            const token = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET, { expiresIn: '5m' })
            ForgetPasswordMail(findUser, token)

            res.json({ "user": findUser })
        } catch (error) {
            console.log(error);
        }
    }
    //Reset password
    static ResetPassword = async (req, res) => {
        try {
            const { id, token } = req.params
            const { password } = req.body
            console.log(password);
            const verifyResult = jwt.verify(token, process.env.JWT_SECRET)
            console.log(verifyResult);
            const hashedPassword = await bcrypt.hash(password, 10)
            console.log(password, hashedPassword);
            await userModel.findByIdAndUpdate(id, { password: hashedPassword })
            res.send("password changed")
        } catch (error) {
            console.log(error);
        }
    }

    //OTP Verification
    static OTPVerification = async (req, res) => {
        const { email } = req.body
        console.log("otp body", email);
        const Otp = generatedOtp()
        console.log("otp", Otp);
        otpSignUp(email, Otp)
        res.json({ validOTP: Otp })
    }
}

module.exports = { User }