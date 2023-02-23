const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const router=require('./Server/Router')
const Connection=require('./Server/database/Connection')
require('dotenv').config()

Connection()
app.use(bodyParser.json())
app.use(router)

const PORT =process.env.PORT || 6000
app.listen(PORT,(err)=>{
    if(!err){
        console.log("Server is running")
    }
})