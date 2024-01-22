const multer = require('multer')
const path = require('path')
//define the multer code for image upload

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'../public/upload'))
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"_"+Date.now()+"_"+file.originalname)
    }
})
// Middleware for handling file uploads with validation
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1 * 1024 * 1024, // Limit file size to 1 MB
    },
    fileFilter: (req, file, cb) => {
        const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/avif'];

        if (allowedFileTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only jpg, png, jpeg, and avif are allowed.'));
        }
    }
}).single('file');
module.exports=upload