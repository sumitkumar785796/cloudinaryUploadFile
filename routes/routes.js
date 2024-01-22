const express = require('express')
const routes = express.Router()
const link = require('../controllers/controllers')
routes.route('/').get(link.main)
routes.route('/add').post(link.handleFileUpload)
module.exports = routes