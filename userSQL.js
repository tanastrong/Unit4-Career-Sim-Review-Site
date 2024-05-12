const client = require('./client')

// select all users
const getAllUsers = async ()=>{
    const SQL = `
    select * from reviewers;
    `
    const response = await client.query(SQL)
    return response.rows
    
}

//select one user
const getAUserWithId = async (id)=>{
    console.log(id)
    const SQL = `

    `
    const response = await client.query(SQL, [id])
    return response.rows[0]
}
//select one user
const getAUserwithEmail = async (email)=>{
    const SQL = `

    `
    const response = await client.query(SQL, [email])
    return response.rows[0]
}

//stretch goal
//update one user
const updateAUser = async (user)=>{
    const SQL = `
    `
    const response = await client.query(SQL,[])
    return response.rows[0]
}

//stretch goal
//delete a user
const removeAUser = async (id)=>{
    const SQL = `
    `
    const response = await client.query(SQL, [id])
    return response.rows[0]
}


//we already have the function to add a user in seed.js
module.exports = {getAUserWithId, getAUserwithEmail, getAllUsers, updateAUser, removeAUser}
