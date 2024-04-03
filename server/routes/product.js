const express = require('express')
const productController = require('../controllers/product.controller')
const product = express()
const upload = require('../middleware/Files.middleware')

product.get('/',productController.GetData)
product.post('/insert',upload.fields([{name:"productImg",maxCount:4},{name:"ownerImg", maxCount:1}]),productController.PostData)
product.get('/:id',productController.GetDataById)
product.put('/update/:id',productController.PutData)
product.delete('/:id',productController.DeleteData)


module.exports = product