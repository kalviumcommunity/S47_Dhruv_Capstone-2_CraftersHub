const nodemailer = require('nodemailer')
require('dotenv').config()

const transpoter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user: "dhruvkhandelwal1184@gmail.com",
        pass: process.env.MAIL_PASS
    }
})

