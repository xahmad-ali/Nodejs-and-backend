const express = require("express");
const app = express();

const cookieParser = require('cookie-parser')
app.use(cookieParser())

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

app.get("/",(req,res)=>{
 
    res.cookie("name","mycookie")
    res.send("ahmad")
    console.log('Cookies: ', req.cookies)

})

// We dont have to send cookies to every /route or page, it goes automatically
app.get("/read", (req, res)=>{
    console.log(req.cookies)
    res.send("read page")
})

// encryption and decryption
app.get("/bcrypt",(req,res)=>{
    bcrypt.genSalt(10, function(err, salt) {
        console.log(salt)
        bcrypt.hash("ahmad", salt, function(err, hash) {
            // Store hash in your password DB.
            console.log(hash)
            res.send(hash)
        });
    });
})
app.get("/decrypt",(req, res)=>{

    // copy the bcrypt form console and paste it in hash
    const hash="$2b$10$W11Yhgdub3dxCmkuHWu/x.wXuUNPQwfkUlnHkAGjKDO/IUpnaC9iC"

    bcrypt.compare("ahmad", hash, function(err, result) {
         result == true
         res.send(result)
    });
})

app.get("/jwtsend",(req, res)=>{
    var token = jwt.sign({ email: 'ahmadali@gamil.com' }, 'mySceret');    
    res.cookie("jwttoken",token)
    res.send(token)
})
app.get("/jwtreceive",(req,res)=>{
    console.log(req.cookies.jwttoken)
    var data = jwt.verify(req.cookies.jwttoken,"mySceret")
    res.send(data)
})

app.listen(3000);