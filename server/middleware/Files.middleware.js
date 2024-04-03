const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file,cb)=>{
        cb(null, './images/product')
    },
    filename :(req, file,cb)=>{
        const name = Date.now()+"_"+file.originalname
        cb(null,name)
    }
})

module.exports = multer({storage:storage})