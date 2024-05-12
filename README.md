This is meant to help people who have fallen behind and need help with capstone. 
The dataBase: all the db logic lived in /db

npm run seed will create and seed your database with 5 reviewers and products and a random number of reviews. 

Change the for loops (in the createData() function located in the seed file )to add more users/reviews/reviews(reviews is based on the number of reviewer, so you willnot need to alter that for loop)

The Logic on the front end and back end has been written for get all products, get reviews and details on a single product, and view a single review. 

That means on certain parts of product_reviwSQL, product_SQl, and reviewer_SQL have been written for you. You will need to complete these files for a functional backend. All the functions you will need are included, just not finished.

Authentication has been completely finished for you. Make sure you review and understand these routes


The express server:<---All express logic lives in the api folder 

The server is built and "using" everything you need. Feel free to change and of the routes that the app is using, but don't delete any cors, json, or express calls. 

/api/index.js is completely written and does not need to be edited unless you want to change route names.
the other three files will need to be finished to make your front end work. Most of "product_router" has been written for you. Use this logic to fill in the other Routers. 

pay attention to stretch goals and don't overwhelm yourself!


Frontend:

Vite has been installed in the client folder for you, your proxy server has also been set up.

This means you can omit the localhost:portNum part of your calls when you send fetch request.

A few are already done for you, so look around the client/src folder for proper syntax.

Each page has motes on the logic behind what should happen on that page, but feel free to use this shell to create your own, unique user experience. 

This means you would keep the data and delete everything except the api folder, and create an app more to your preference. (This is strongly encouraged).

about 50% of your routes are already written and functional.

Components:
Again, the logic for Homepage---->All products --> single product/reviews for a single product---> single review has all been done for you on the front end as well. Use this logic to guide you through creating the rest of the components. The components already have the bare minimum hooks they will need to function. Most of them already have the variables and props you need imported. 

PLEASE make sure you study these relationships to understand how data is being passed around.

Logic: There are 18 functions in api.js. Five of them are stretch goals and 3 have been written for you. So 10 front-end calls to the backend to get data. Some of these are written to make your life easier. Ideally you'll only need to;

  product_reviews table - create/read many/read one/update/delete
  reviewers table - create/read many/read one 
  products table - read many/read one product
  Everything else just makes things easier/is a stretch goal


Authentication has been completely finished for you. Make sure you review and understand these routes.

Message your Instructor/mentors with any questions!

Good luck and Happy Coding!!!

