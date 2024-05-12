const express = require('express')
const app = express()
//cors is so we can connect on the front end
const cors = require('cors')

const port = process.env.PORT ||8080
//local file
const client = require('./db/client')

require('dotenv').config()
app.use(cors())
app.use(require('morgan')('dev'))
app.use(express.json())

app.use("/productreviewapi", require('./api/index'))
   
const init = async ()=>{
    await client.connect()
    app.listen(port, ()=>{
        console.log("The server is running.")
    })
}
init()
