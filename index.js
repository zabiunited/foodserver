const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const router=require('./Server/Router')
const Connection=require('./Server/database/Connection')

Connection()
app.use(bodyParser.json())
app.use(router)

app.listen(6000,(err)=>{
    if(!err){
        console.log("Server is running")
    }
})