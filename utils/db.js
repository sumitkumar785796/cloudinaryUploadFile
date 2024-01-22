const mongoose = require('mongoose')
const URL = process.env.DB_URL || "mongodb://localhost:27017/"
const connDB = async () =>{
    try {
        await mongoose.connect(URL)
        console.log('connected successfully...')
    } catch (error) {
        console.log('not connected...')    
    }
}
module.exports = connDB