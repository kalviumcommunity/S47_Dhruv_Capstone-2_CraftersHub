const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 2000
app.use(express.json())


const Data = [{
    name:"Dhruv"
}]

app.get('/',(req,res)=>{
    res.json(Data)
})

app.post('/post',(req,res)=>{
    console.log(req.body)
    const newData = req.body
    Data.push(newData)
    res.json(newData)
})

app.put('/:id',(req, res)=>{
    const id = parseInt(req.params.id)
    const updatedData = req.body
    Data[id] = updatedData
    res.json(updatedData)
})
app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})