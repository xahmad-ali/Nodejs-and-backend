const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user');
const postModel = require('./models/post.js');
require('dotenv').config('/env');


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer  = require('multer');
const crypto = require('crypto'); //-> it is prefined javaScript library
const user = require('./models/user');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, "public")));


/////////////////
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, './public/images/uploads')
    },
    filename: function (req, file, cb) {
        crypto.randomBytes(12,(err,bytes)=>{
            const fn = bytes.toString("hex") + path.extname(file.originalname)
            cb(null,fn)
            console.log("uploaded Successfuly")
        })
    }
});

const upload = multer({ storage: storage })

/////////////
app.get("/", (req,res)=>{
    res.render("signup")
})

app.post("/register", async(req,res)=>{
    // decomposing data
    let {name, userName, email, password, age}= req.body
    //now chechking if user with same email alrdy exisits
    const user = await userModel.findOne({email})
    if(user){ return res.status(500).send("Already registered go to login")}

    bcrypt.genSalt(10,  function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {
            const user = await userModel.create({
                name,
                userName,
                email,
                age,
                password: hash
            });
            res.status(200).send("You have been registered Successfuly, now go to login");
        });
    });
})
//////////////
app.get("/logout",(req,res)=>{
    res.cookie("token", "")
    res.send("You have been logged out")
})

////////////////////
app.get("/login",(req, res)=>{
    res.render("login")
})

app.post("/auth", async (req,res)=>{
    let {userName, email, password}=req.body
    const user = await userModel.findOne({ email: email})
    if(!user){ return res.status(500).send("User does not exist")}

    bcrypt.compare(password, user.password, function(err, result) {
        if(!result){ return res.status(500).send("Wrong password or email")}
        else{
            // importing sceretkey from .env using dotenv
            const jwtToken = process.env.JWT_TOKEN;
            let token = jwt.sign({email: email, userid: user._id},jwtToken)
            // sending cookie on browser
            res.cookie("token",token)
            res.status(200).send("You have been logged in Successfuly");
        }
    });
})

//////////////
app.get("/profile",isloggedIn,async(req, res)=>{
    // here we used req.user.email instead of req.body, cuz i)no data is sent through routes ii) post request
    let user = await userModel.findOne({email: req.user.email}).populate("posts")
    res.render("profile", {user})
})

////////////////////
app.post("/post",isloggedIn,async(req,res)=>{
    let user = await userModel.findOne({email: req.user.email})
    let {content} = req.body
    const post = await postModel.create({
        user: user._id,
        content
    })
    //// saving the post._id in user.posts
    user.posts.push(post._id);
    await user.save();
    res.redirect("/profile")
})

//////////////
app.get("/likes/:id", isloggedIn, async (req,res)=>{
    let post = await postModel.findOne({_id: req.params.id}).populate("user")

    if(post.likes.indexOf(req.user.userid) === -1){
        post.likes.push(req.user.userid)
    }else{
        post.likes.pop(req.user.userid)
    }

    await post.save()
    res.redirect("/profile");
})

/////////////////
app.get("/edit/:id",isloggedIn ,async(req, res)=>{
    let post = await postModel.findOne({_id: req.params.id})
    res.render("edit",{post})
})

app.post("/update/:id",isloggedIn ,async(req, res)=>{
    // console.log(req.params)
    let post = await postModel.findOneAndUpdate({_id: req.params.id},{content: req.body.content})

    res.redirect("/profile")
})


////////////////////
app.post("/upload",upload.single('image'),isloggedIn, async(req,res)=>{
    console.log(req.file)
    let user = await userModel.findOne({email: req.user.email})
    user.avatar = req.file.filename;
    await user.save();
    res.redirect("/profile");
})



// middleware isloggegin
function isloggedIn(req,res,next){
    if(req.cookies.token === ""){ res.send("You must be logged in")}
    else{
        const verify= jwt.verify(req.cookies.token, process.env.JWT_TOKEN)
        //console.log(verify)
        req.user = verify;
        next();
    }
    
    
}



app.listen(3000);