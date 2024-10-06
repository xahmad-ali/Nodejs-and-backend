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
  let { firstName, lastName, email, city, gender, description, subjects } =
    req.body;
  if (
    firstName ||
    lastName ||
    email ||
    city ||
    gender ||
    description ||
    subjects
  ) {
    let createdUser = await userModel.create({
      /* userName: userName  */
      firstName, // if both property names are same then can be written like this
      lastName,
      email,
      city,
      gender,
      description,
      subjects,
    });

    /* let user = await userModel.create({
        name: "ahmad",
        userName: "Ahmi",
        email: "ahmad@gmail.com"
    })  */

    // always use send instead of render or it will ceate error
    //res.send(createdUser);
    res.redirect("/read")
  }
});

//////////////////////////
app.get("/read", async (req, res) => {
  //find()  simply displays all users returns an array
  //If find({findone}) if a parameter is passed, it returns that user with that matched attribute
  //findOne({findone}) requires parameter, returns Object, Very first match
  /*let users = await userModel.findOne({name: "Ali"}) */
  let users = await userModel.find();
  //res.send(users)
  res.render("list", { users });
});

///
app.get("/edit/:email", async(req,res)=>{
  let user = await userModel.findOne({email: req.params.email}) 
  //console.log(user)
  res.render("edit", { user })
})
//////////////////////////
app.get("/update/:email", async (req, res) => {
  //findOneAndUpdate({findone "pass username or email or id"}, {update "attribute and its new value "} , {new : true})
  //updateOne({findone}, {update}, {new :true})

 
});

///////////////////////////
app.get("/delete/:email", async (req, res) => {
  // only returns deleted user once
  let email = req.params.email;
  console.log(email);
  let userDeleted = await userModel.findOneAndDelete({ email });
  res.redirect("/read")
});

/*
app.get('/delete-null', async(req, res)=>{
  // only returns deleted user once
  //let email = req.params.email
  // console.log(email)
  let userDeleted = await userModel.findOneAndDelete({email:""})
  res.send(userDeleted)
}) */
app.listen(3000);
