const express = require('express');
const app = express();


const userModel = require('./userModel')


app.get('/',(req, res)=>{
    res.send("hello")
})

app.get('/create', async(req, res)=>{
    let user = await userModel.create({
        name: "ahmad",
        userName: "Ahmi",
        email: "ahmad@gmail.com"
    })

    // always use send instead of render or it will ceate error
    res.send(user);

})

app.get('/update', async(req, res)=>{
    
    //findOneAndUpdate({findone "pass username or email or id"}, {update "attribute and its new value "} , {new : true})
    //updateOne({findone}, {update}, {new :true})
    let user =await userModel.findOneAndUpdate({name:"ahmad"},{name: "Ali"},{new: true})
    res.send(user)
})

app.get('/read', async(req, res)=>{
    //find()  simply displays all users returns an array
    //If find({findone}) if a parameter is passed, it returns that user with that matched attribute
    //findOne({findone}) requires parameter, returns Object, Very first match 
    /*let users = await userModel.findOne({name: "Ali"}) */
    let users = await userModel.find()
    res.send(users)
})

app.get('/delete', async(req, res)=>{
    // only returns deleted user once
    let user = await userModel.findOneAndDelete({name: "Ali"})
    res.send(user)
})


app.listen(3000);