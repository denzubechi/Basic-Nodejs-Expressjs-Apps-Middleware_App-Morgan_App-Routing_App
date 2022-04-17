const express = require("express")
const app = express()
const route = express.Router();
var accounts = require("./database.js") //when you specify constant you cant update the data of the variable
//when you want to add a delete request thats why we use the var



//Get Request
//in json format
route.get('/accounts',(req, res)=>{
    res.json({userDate: accounts})
})

//POST
route.post('/accounts',(req,res)=>{
    const incomingAccount = req.body
    accounts.push(incomingAccount) //pushing the data to the database.js file
    res.json(accounts)
})
//Get user from id
route.get('/accounts/:id',(req,res)=>{
    const accountId = Number(req.params.id) //Turning the string to a number
    const getAccount = accounts.find((account)=>account.id === accountId)
    if(!getAccount){
        res.status(500).send("User Not found")
    }else{
        res.json({userData:[getAccount]}) //pasting the response as json
    }
})
//PUT methoud
route.put('/accounts/:id',(req,res)=>{
    const accountId = Number(req.params.id) //Turning the string to a number
    const body = req.body;
    const account = accounts.find((account)=>account.id === accountId)
    const index = accounts.indexOf(account) //getting the index of the account 
    if(!account){
        res.status(500).send("Account not found")
    }else{
        const updatedAccount = {...account, ...body}
        accounts[index] = updatedAccount
        res.send(updatedAccount)
    }
    

}
)
//Delete Request
route.delete('/accounts/:id', (req,res)=>{
    const accountid = Number(req.params.id);
    const newAccounts = accounts.filter((account)=>account.id != accountid)


    if(!newAccounts){
        res.status(500).send("Accounts not found")
    }else{
        accounts = newAccounts;
        res.send(accounts)
    }
})

module.exports = route;