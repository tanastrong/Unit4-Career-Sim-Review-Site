const client = require('./client')

// select all Products
const getAllProducts = async ()=>{
    const SQL = `
    select * from products;
    `
    const response = await client.query(SQL)
    return response.rows
}

//select one Product
const getAProduct = async (id)=>{
    const SQL = `
    select * from products
    where id = $1;
    `
    const response = await client.query(SQL, [id])
    return response.rows[0]
}


//update one Product
const updateAProduct = async ({name, description, imgUrl, category_id, product_id})=>{

    const SQL = `

    `
    const response = await client.query(SQL,[name, description, imgUrl, category_id, product_id])
    return response.rows[0]
}


//delete a Product
const removeAProduct = async (id)=>{
    const SQL = `
    `
    const response = await client.query(SQL, [id])
    return response.rows[0]
}


//we already have the function to add a Product in seed.js
module.exports = {getAProduct, getAllProducts, updateAProduct, removeAProduct}
