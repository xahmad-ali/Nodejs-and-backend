const express = require('express');
const app = express();
const localPath = require('path');

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(localPath.join(__dirname,"public")));

app.get('/',(req, res)=>{
    res.render("index")
})

app.listen(3000);