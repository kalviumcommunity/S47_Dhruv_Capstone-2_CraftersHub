const express = require('express')
const productController = require('../controllers/product.controller')
const product = express()
const upload = require('../middleware/Files.middleware')
const { routeProtector } = require('../middleware/passport.middleware')
const {paymentCheckout,paymentVerification} = require('../controllers/payment.controller')

//product route
product.get('/',productController.GetData)
product.post('/insert',upload.fields([{name:"productImg",maxCount:4},{name:"ownerImg", maxCount:1}]),productController.PostData)
product.get('/:id',productController.GetDataById)
product.put('/update/:id',productController.PutData)
product.delete('/:id',productController.DeleteData)

//paayment route
product.post('/payment',paymentCheckout)
product.post('/paymentVerification',paymentVerification)

module.exports = product