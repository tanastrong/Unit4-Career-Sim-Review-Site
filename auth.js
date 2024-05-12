//express helps us create routers to listen on our app
const express = require('express')
//use express to create the router
const authRouter = express.Router()
//pull in helper functions 
const {getAUserwithEmail} = require('../db/userSQL')
const {createReviewer} = require ('../db/seed')
//jwt to authenticate users
const jwt = require('jsonwebtoken')
//secret to help with jwt authentication
const JWTSECRET = process.env.JWTSECRET || "SHHH"
//bcrypt for password encryption
const bcrypt = require('bcrypt')

//register Route
authRouter.post('/register', async (req, res, next)=>{
    try {
        //first we check to see if that user already has an account, maybe they forgot their password
        const reviewer = await getAUserwithEmail(req.body.email)
        //if we don't find anyone with that account, we know we are good to create a new one!
        if(!reviewer){
            //create the user to add to the database with the info from req.params
            const userToAdd = {
            firstName:req.body.firstname,
            lastName: req.body.lastname, 
            email:req.body.email, 
            password:req.body.password
            }
            //create the new reviewer with the SQL function.
            const newReviewer = await createReviewer(userToAdd)
            //token just for your user from jwt
            const token = jwt.sign(newReviewer.id, JWTSECRET)
            //given the token to your user
            newReviewer.token = token
            //send the user to the front-end
            res.send(newReviewer)
        }else{
            //if the user WAS found, we'll tell the user that email already has an account and suggest they attemp loggin in with that email or try a different email. 
            res.status(400).send("That email is taken, try logging in!")
        }
    } catch (error) {
        next(error)
    }
}) 

//Login Route
authRouter.post('/login', async (req, res, next)=>{
    try {
        //first we want to see if the user exist. we ONLY need the email for this
        const reviewer = await getAUserwithEmail(req.body.email)
        //if we don't find that email in their database, they either have a typo in their email, or are using the wrong email.We don't want to give away to much info here incase our user is a hacker trying to compormise our site!
        if(!reviewer){
            //feel free to change this message
            res.status(500).send("Something went wrong! Check your username and password and try again! ")
            //if they have the right password, we need to check to make sure they have the right password...

        }else if (!await bcrypt.compare(req.body.password, reviewer.password)){
           // console.log(bcrypt.hash(req.body.password, reviewer.password, "blah"))
            //if there IS a user with that email, but the passwords don't match...We want to send the same exact mesage as wrong username, this way hackers won't be able to guess usernaes/password combos. 
             res.status(500).send("Something went wrong! Check your username and password and try again! ")
        }else{
            //if the email and password are correct, we can add the token to the user and send them both to the front end! 
            reviewer.token = jwt.sign(reviewer.id, JWTSECRET)
            res.send(reviewer)
        }
    } catch (error) {
        next(error)
    }
}) 

module.exports = authRouter