const client = require('./client')
const bcrypt = require('bcrypt')
const {faker} = require('@faker-js/faker')
const createTables = async ()=>{
    const SQL = `
    DROP TABLE IF EXISTS product_reviews CASCADE;
    DROP TABLE IF EXISTS products CASCADE;
    DROP TABLE IF EXISTS reviewers CASCADE;
    DROP TABLE IF EXISTS category CASCADE;

    CREATE TABLE reviewers(
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL, 
        admin boolean default false
    );
    CREATE TABLE category(
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        category VARCHAR(255) NOT NULL
    );
    CREATE TABLE products(
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        imgUrl varchar(255),
        category_id UUID REFERENCES categories(id) NOT NULL
    );
    
    CREATE TABLE product_reviews(
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES reviewers(id) NOT NULL,
        product_id UUID REFERENCES products(id) NOT NULL,
        review TEXT NOT NULL, 
        rating INT DEFAULT 3,
        UNIQUE (user_id, product_id)
    );
    
    `
    await client.query(SQL)
}

//don't forget to add a rating everywhere!!

const createCategory = async (category)=>{
    const SQL = `
        INSERT INTO categories(category)
        VALUES($1)
        RETURNING *;
    `
  const response = await client.query(SQL, [category])
 // console.log(response.rows, "response")
  return response.rows[0]
}


const createReviewer = async ({firstName, lastName, email, password, admin})=>{
    const SQL = `
        INSERT INTO reviewers(firstName, lastName, email, password, admin)
        VALUES($1,$2, $3, $4, $5)
        RETURNING *;
    `
  const response = await client.query(SQL, [firstName, lastName, email, await bcrypt.hash(password, 5), admin])
  return response.rows[0]
}

const createProduct = async ({name, description, imgUrl, category_id})=>{
    const SQL = `
        INSERT INTO products(name, description, imgUrl, category_id)
        VALUES($1,$2, $3, $4)
        RETURNING *;
    `
    const response = await client.query(SQL, [name, description, imgUrl, category_id])
    return response.rows[0]
}

const createProduct_review = async (userId, productId, review, rating=Math.floor(Math.random()*6))=>{
    const SQL = `
    INSERT INTO product_reviews(user_id, product_id, review, rating)
    VALUES($1,$2, $3, $4)
    RETURNING *;
    `
    const response = await client.query(SQL, [userId, productId, review, rating])
    return response.rows[0]
}

const createData = async ()=>{
    client.connect()
    //arrays to hold products and reviewers to create relationships later
        const products = []
        const reviewers =[]
        const categories = []
        //create tables
        createTables()
        for(let i=0; i<5;i++){
           const newCategory= await createCategory(faker.commerce.department())
           categories.push(newCategory)
         //  console.log("new Category", newCategory)
       }
        //create 5 users and products
        for(let i=0; i<5;i++){
            const randomCategory = categories[Math.floor(Math.random()*categories.length)]

            const rawProduct = {
                name:faker.commerce.productName(), 
                description: faker.commerce.productDescription(),
                imgUrl:faker.image.urlLoremFlickr({ category: faker.commerce.department(), height:300, width:300 }),
                category_id:categories[Math.floor(Math.random()*categories.length)].id
            }
            const product = await createProduct(rawProduct)
            let reviewer = {}
            if(i === 0){
               reviewer = await createReviewer({
                    firstName:"Danielle", 
                    lastName: "Williams", 
                    email:"a@a.com", 
                    password:"password",
                    admin:true
                })
            }else{
                reviewer = await createReviewer({
                    firstName:faker.person.firstName(), 
                    lastName: faker.person.lastName(), 
                    email:faker.internet.email(), 
                    password:"password",
                    admin:false
                })
            }

        products.push(product)
        reviewers.push(reviewer)
       }
       //create 5 reviews for each product
       const reviewedProducts = []
       for(let i=0; i<reviewers.length;i++){
            const dummyReviews = ["I loved it!", "I liked it!", "Best product ever", "Meh", "I've had better", "I disliked it", "I hated it", "worst product ever!"]
            const productIndex =  Math.floor(Math.random()*products.length)
            const productsToReview=products.slice(productIndex, productIndex+3)
            const reviews = await Promise.all(productsToReview.map(product=>createProduct_review(reviewers[i].id, product.id, dummyReviews[Math.floor(Math.random()*dummyReviews.length)])))
            reviewedProducts.push(...reviews)
        }
    console.log(`the database has been seeded with ${reviewers.length} reviewers, ${products.length} products, and ${reviewedProducts.length} randomly assigned product reviews`)
}
!module.parent && createData().then(()=>client.end())

module.exports = {createData, createProduct, createReviewer, createProduct_review}