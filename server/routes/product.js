const express = require('express')
const productController = require('../controllers/product.controller')
const product = express()

product.get('/',productController.GetData)
product.post('/insert',productController.PostData)
product.get('/:id',productController.GetDataById)
product.put('/update/:id',productController.PutData)
product.delete('/:id',productController.DeleteData)
module.exports = product