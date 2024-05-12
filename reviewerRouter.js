const express = require('express')
const reviewerRouter = express.Router()
const {getAUserWithId, getAUserwithEmail, getAllUsers, removeAUser, updateAUser} = require('../db/userSQL')
const {createReviewer} = require('../db/seed')



//get all reviewers
//use this url to read your data
//http://localhost:8080/productreviewapi/reviewers/
reviewerRouter.get("/", async (req, res, next)=>{
    try{
        res.send(await getAllUsers())
    }catch(error){
        next(error)
    }
})
//get a reviewer
//use this url to read your data
//http://localhost:8080/productreviewapi/reviewers/{a reviewer id goes here}
reviewerRouter.get("/:id", async(req, res, next)=>{
    try{
        res.send("await a call to the right function")
    }catch(error){
        next(error)
    }
})
//post/add a reviewer
//use this url to update your data
//http://localhost:8080/productreviewapi/reviewers
reviewerRouter.post("/", async(req, res, next)=>{
    try{
        res.send("await a call to the right function")
    }catch(error){
        next(error)
    }
})
//stretch goal
//patch/update a reviewer
//use this url to update your data
//http://localhost:8080/productreviewapi/reviewers/{a reviewer id goes here}
reviewerRouter.patch("/:id", async(req, res, next)=>{
    try{
        const newreviewer = req.body
        res.send("await a call to the right function")
    }catch(error){
        next(error)
    }
})
//stretch goal
//delete/remove a reviewer
//use this url to update your data
//http://localhost:8080/productreviewapi/reviewers/{a reviewer id goes here}
reviewerRouter.delete("/", async(req, res, next)=>{
    try{
        //call the right function
        res.send("nothing is returned from the database, so write a message letting them know the product was deleted")
    }catch(error){
        next(error)
    }
})

module.exports = reviewerRouter