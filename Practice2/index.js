const express = require('express');
const app = express();
const localPath = require('path');
const fs = require('node:fs');
const path = require('path');

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(localPath.join(__dirname,"public")));

app.get('/',(req, res)=>{
    fs.readdir(`./files_task`,(err, files)=>{
        res.render("index", {files: files})
    })
})

app.get('/file/:filename', (req, res)=>{
    fs.readFile(`./files_task/${req.params.filename}`,"utf-8", (err,fileData)=>{
        console.log(fileData)
        res.render("show", {taskname: req.params.filename , taskdata: fileData })
    })
})

app.post('/create',(req, res)=>{
   // console.log(req.body)
    fs.writeFile(`./files_task/${req.body.title.split(` `).join('')}.txt`, req.body.title, (err)=>{
        res.redirect('/')
    })
})

app.listen(3000);