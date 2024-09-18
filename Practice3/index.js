const express = require("express");
const app = express();
const path = require("path");

const userModel = require("./userModel");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", async (req, res) => {
  let { userName, email, url, gender } = req.body;

  let createdUser = await userModel.create({
    /* userName: userName  */
    userName, // if both property names are same then can be written like this
    email,
    url,
    gender,
  });

  /* let user = await userModel.create({
        name: "ahmad",
        userName: "Ahmi",
        email: "ahmad@gmail.com"
    })  */

  // always use send instead of render or it will ceate error
  res.send(createdUser);
});

app.get("/read", async (req, res) => {
  //find()  simply displays all users returns an array
  //If find({findone}) if a parameter is passed, it returns that user with that matched attribute
  //findOne({findone}) requires parameter, returns Object, Very first match
  /*let users = await userModel.findOne({name: "Ali"}) */
  let users = await userModel.find();
  //res.send(users)
  res.render("list", { users });
});

app.get("/update", async (req, res) => {
  //findOneAndUpdate({findone "pass username or email or id"}, {update "attribute and its new value "} , {new : true})
  //updateOne({findone}, {update}, {new :true})
  let user = await userModel.findOneAndUpdate(
    { name: "ahmad" },
    { name: "Ali" },
    { new: true }
  );
  res.send(user);
});


app.get('/delete', async(req, res)=>{
    // only returns deleted user once
    let user = await userModel.findOneAndDelete({userName: "ahmad"})
    res.send(user)
})  

app.listen(3000);
