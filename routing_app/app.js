//SIMPLE ROUTIMG APP AND WORKING WITH DIFFERENT HTTP MODULES

const express = require("express")
const app = express();
const morgan = require("morgan")
const { v4:uuidv4 } = require("uuid")
const path = require("path")
const fs = require("fs")
const route = require("./router.js")

//parse data to a body
app.use(express.urlencoded({extended:false}))
//Home route
app.get('/', (req,res)=>{
    res.send('Welcome to routing app')
})
//Specifying the middleware for the different routes
app.use('/api', route)

 
const port = process.env.PORT||3000;

app.listen(port,()=>{
    console.log("Server is listening to port 3000")
})



