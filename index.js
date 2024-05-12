const express = require('express')
const myAPIRouter = express.Router()

myAPIRouter.use("/auth", require('./auth'))
myAPIRouter.use("/products", require('./productRouter'))
myAPIRouter.use("/reviewers", require('./reviewerRouter'))
myAPIRouter.use("/product_reviews", require('./product_reviewRouter'))

module.exports = myAPIRouter
