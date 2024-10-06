const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user.js");

const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("signup");
});

app.post("/create", (req, res) => {
  let { name, email, age, password } = req.body;

  if (name || email || age || password) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        let createdUser = userModel.create({
          name,
          email,
          age,
          password: hash,
        });
        let token = jwt.sign({email},"sceretKey")
        res.cookie("token" , token)
        res.send(createdUser)
      });
    });
  }

  
});

app.get("/login",(req,res)=>{
    res.render("login")
})

app.post("/auth",async(req,res)=>{
    const user = await userModel.findOne({email: req.body.email})
    if(!user){ res.send("Authentication h1")}

    //console.log(user.password)
    // here user.password comes from data base, it is encrypted
    bcrypt.compare(req.body.password, user.password, function(err, result) {
        console.log(result)
        if(result){
        let token = jwt.sign({email: req.body.email},"sceretKey")
        res.cookie("token",token)
        res.send("You are logged in")
        }
        else{
        res.send("Authentication failure h2")
        }
    });
})

app.get("/logout",(req,res)=>{
    res.cookie("token","");
    res.redirect("/")
})

app.listen(3000);
