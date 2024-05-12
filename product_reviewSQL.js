const client = require('./client')

// select all Product reviews
const getAllProduct_reviews = async()=>{
    const SQL = `
    select * from product_reviews;
    `
    const response = await client.query(SQL)
    return response.rows
}

// select all Product reviews based on a reviewer
const getAllReviewerProduct_reviews = async(user_id)=>{
    const SQL = `
    SELECT * from product_reviews
    WHERE user_id =$1;
    `
    const response = await client.query(SQL, [user_id])
    return response.rows
}
// select all Product reviews based on a product
const getAllProductProduct_reviews = async(product_id)=>{
    const SQL = `
    select * from product_reviews
    where product_id = $1;
    `
    const response = await client.query(SQL, [product_id])
    return response.rows
}

//select one Product_review
const getAProduct_review = async(id)=>{
    const SQL = `
    select * from product_reviews
    where id =$1;
    `
    const response = await client.query(SQL,[id])
    return response.rows[0]
}


//update one Product_review
const updateAProduct_review = async(reviewId, newReview, rating)=>{
    //you only should be able to change the text for the review, if you want to change the reviewer or product IDs delete this relationship and create a new one. 
    const SQL = `
    UPDATE product_reviews
    SET review= $2
    rating = $3
    WHERE id + $1
    RETURNING *;
    `
    const response = await client.query(SQL,[reviewId, newReview, rating])
    return response.rows[0]
}


//delete a Product_review
const removeAProduct_review = async(id)=>{
    //careful not to delete the reviewer or product
    const SQL = `
    DELETE from product_reviews
    WHERE id = $1
    RETURNING *;
    `
    const response = await client.query(SQL, [id])
    return response.rows[0]
}


//we already have the function to add a Product_review in seed.js
module.exports = {getAProduct_review, getAllProduct_reviews,getAllReviewerProduct_reviews,getAllProductProduct_reviews, updateAProduct_review, removeAProduct_review}
