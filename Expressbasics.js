//express is a framework
//express manages everything from reciveing and sending request and response

const express = require('express')

const app = express()

//Now the app variable has all the propeties of express

{/* app.get(route, requsetHandler)   ====>   This is basic Structure of Setting a route 
    requsetHandler is actualy equals to  (req, res)  */}

app.get('/', (req, res)=>{
    res.send("This my is / page ")
})

app.get('/home', (req , res)=>{
    res.send("This is home page ")
})

app.listen(3000)