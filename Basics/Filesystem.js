// firstly import this line 
const fs = require('node:fs');

// creating a file 
/*
fs.writeFile("file1.txt","I am Ahmad",(err)=> {
    if(!err){console.log("created")}
    else {console.log("failed creating",err)}
})*/

// Appending some new data in exsisting file
/*
fs.appendFile("file1.txt", "\ni have added this line using appendFile",(error)=>{
    if(!error){console.log("appened")}
    else {console.log("failed appending",err)}
}) */

// Renaming a file
/*
fs.rename("file1.txt", "renamed.txt",(err)=>{
    if(!err){console.log("ReNamed")}
    else{console.log("failed Renameing")}
}) */


// Deleting a file
fs.unlink("renamed.txt",(err)=>{
    if(!err){console.log("Deleted")}
    else{console.log("failed deleing",err.message)}
}) 
