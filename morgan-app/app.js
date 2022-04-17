const express = require("express")
const app = express();
const morgan = require("morgan")
const { v4:uuidv4 } = require("uuid")
const path = require("path")
const fs = require("fs")




morgan.token('id', function getId(req){
    return req.id
})

//Creating a morgan token
morgan.token('param', function(req,res,next){
    return "UserToken"
})

//creating an access.log file
let accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"),{flags:'a'})
// a appends all the information in the log below

app.use(assignid)


//Useful tokens in morgan applications
app.use(morgan(':id :param :method :status :url"HTTP/:http-version"'))
//appending the info in the access.log file
app.use(morgan(':id :param :method :status :url"HTTP/:http-version"', {stream: accessLogStream}))


app.get('/',(req,res)=>{
    res.send("Welcome to morgan app")
})
//getting a unique Id
function assignid(req,res,next){
    req.id = uuidv4();
    next();
}

 
const port = process.env.PORT||3000;

app.listen(port,()=>{
    console.log("Server is listening to port 3000")
})



