require('dotenv').config()
const PORT = process.env.PORT || 3001
const express = require('express')
const path = require('path')
const session = require('express-session')
const connDB = require('../utils/db')
const routes = require('../routes/routes')
const app = express()
//set static file path
const staticPath = path.join(__dirname,'../public')
app.use(express.static(staticPath))
// Set up session middleware
app.use(session({
    secret: 'submitForm',//any name to write this secret key
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30000 } // adjust session expiration time as needed
}));
//set view engine
app.set('view engine','ejs')
//use routes
app.use('/',routes)
const serverStart = async () =>{
    try {
        await connDB()
        app.listen(PORT,()=>{
            console.log(`server is running at http://localhost:${PORT}`)
        })
    } catch (error) {
        console.error('Error',error)        
    }
}
serverStart();