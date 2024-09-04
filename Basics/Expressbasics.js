//express is a framework
//express manages everything from reciveing and sending request and response

const express = require('express')
const app = express()
//Now the app variable has all the propeties of express

// we can create as many midllerwares as we want
app.use((req, res, next)=>{
    console.log("this is middleware it will run everytime when any route is hit") 
    next() // it is necessery to next the request to the route
})

// creating a middlerware to convert json to redable, this converts data to urlencoded and back
// its actually Parser
app.use(express.json());
app.use(express.urlencoded({extended:true}));

{/* app.get(route, requsetHandler)   ====>   This is basic Structure of Setting a route 
    requsetHandler is actualy equals to  (req, res)  */}

app.get('/', (req, res)=>{
    res.send("This my is / page ")
})

app.get('/home', (req , res, next)=>{
    res.send("This is home page ")
    return next(new Error("page does not exsist"))  // At here is the error handler
})


// ERorr handler 
app.use((err, req, res, next)=>{
    console.error(err.stack)
    res.status(500).send('Something just broke')
})

app.listen(3000)
