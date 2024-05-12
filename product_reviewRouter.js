const express = require('express')
const product_reviewRouter = express.Router()
const {getAProduct_review, getAllProduct_reviews, getAllProductProduct_reviews, getAllReviewerProduct_reviews, removeAProduct_review, updateAProduct_review} = require('../db/product_reviewSQL')
const {createProduct_review} = require('../db/seed')
const{getAUserWithId} = require('../db/userSQL')
const{getAProduct} = require('../db/productSQL')

//getAllReviews

//get all reviews for a product
//use this url to read your data
//http://localhost:8080/productreviewapi/product_reviews/product/{a product id goes here!}
product_reviewRouter.get("/product/:product_id", async (req, res, next)=>{
    
    try{
        //the front end wil send us a product_id in the url parameters
        const product_id = req.params.product_id
        //we will use that product id in a SQL function that gets all reviews for that product
        const productReviews = await getAllProductProduct_reviews(reviewer_id)
        
        const reviewer = await getAUserWithId(reviewer_id)
        //we will also map over the array of reviews and find the reviewer for each one
        const products = await Promise.all(productReviews.map(review=>getAProduct(review.product_id)))
        //to make life easier on the front end, we retrieve the product details to send as well
        const product = await getAProduct(product_id)
        //the detailed reviews maps over each review and creates a new object with only the review text and reviewer name
        const detailedReviews = productReviews.map((review,i)=>{return{id: review.id, review:review.review,reviewer:{reviewerName:reviewers[i]. firstname + " "+ reviewers[i].lastname, reviewerId:reviewers[i].id}}})
        //the final object that is sent to the front end has the product name and an array of reviews(text and reviewer name)
       res.send({reviewer:reviewer, reviews:detailedReviews, product:detailedReviews.map(review=>review.product)})
    }catch(error){
        next(error)
    }
})
//get a review
//use this url to read your data
//http://localhost:8080/productreviewapi/product_reviews//{a review id goes here!}
product_reviewRouter.get("/:review_id", async (req, res, next)=>{
    
    try{
       res.send(getAProduct_review(req.params.review_id))
    }catch(error){
        next(error)
    }
})

//add a review
//use this url to add to your data
//http://localhost:8080/productreviewapi/product_reviews
product_reviewRouter.post("/", async (req, res, next)=>{
    try{
        //the front end will send this information in the body of our req.body
        //remember you are the front end user as well, so be sire to send this in you fetch request body!
        const user_id = req.body.user_id
        const product_id = req.body.product_id
        const review = req.body.review
        const rating = req.body.rating
        res.send(await createProduct_review(user_id, product_id, review, rating))
        if(user_id){
            res.send("if our user is logged in, await a call to the right function, send it the user_id, product_id and review<--in that order!!")
        }else{
            res.send("If not, send them a message telling them to log in first!")
        }
    }catch(error){
        next(error)
    }
})

//patch/update a review
//use this url to update your data
//http://localhost:8080/productreviewapi/product_reviews/{a product_review id goes here}
product_reviewRouter.patch("/:id", async (req, res, next)=>{
    try{
        //the front end will send this information in the body of our req.body
        //remember you are the front end user as well, so be sire to send this in you fetch request body!
        const user_id = req.body.user_id
        const review_id = req.params.id
        const review_edits = req.body.review
        const rating = req.body.rating
    
        if(user_id){
            //get the review they want...
            const review = await getAProduct_review(review_id)
            
            if(review.user_id===user_id){
                res.send(await updateAProduct_review(review_id, review_edits, rating))
            }else{
            res.send("You are not authorized to edit this review!")
            }
        }else{
            res.send("Send a message telling them to log in to edit review!")
        }
    }catch(error){
        next(error)
    }
})

//delete/remove a product
//use this url to delete your data
//http://localhost:8080/productreviewapi/product_reviews
product_reviewRouter.delete("/:review_id/user_id", async (req, res, next)=>{
    try{
        //the front end will send this information in the body of our req.body
        //remember you are the front end user as well, so be sire to send this in you fetch request body!
        const user_id = req.body.user_id
        const review_id = req.params.id
        //if a user is logged in...
        if(user_id){
            //get the review they want...
            const review = await getAProduct_review(review_id)
            console.log(user_id, review)
            if(review.user_id===user_id){
                res.send(await removeAProduct_review(review_id))
            }else{
                res.send("You are not authorized to delete this review!")
            }
        }else{
            res.send("You must be logged in to delete reviews.")
        }
    }catch(error){
        next(error)
    }
})

module.exports = product_reviewRouter