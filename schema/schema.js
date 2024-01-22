const mongoose = require('mongoose')
const UploadFileSchema = new mongoose.Schema({
    fname:String,
    file:{
        type:String,
        required:true
    }
})
//define collection
const UploadFile = new mongoose.model('UploadFile',UploadFileSchema)
module.exports=UploadFile