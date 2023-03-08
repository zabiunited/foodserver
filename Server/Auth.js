const jwt=require('jsonwebtoken')
const Customer=require('./database/Customer')
require('dotenv').config()

const Auth=async(req,res,next)=>{
    try{
        console.log("first",req.headers)
        const token=req.headers.authorization.split(" ")[1]
        console.log("check 1",token)
        const find=jwt.verify(token,process.env.TOKEN)
        console.log("check 2",find)
        await Customer.findById(find.data._id)
        .then(data=>{
            console.log("check 3",data)
            if(data==null){
                return res.status(400).json("User Does not Authorize..")
            }
            else{
                next()
            }
        })
        .catch(err=>{
            return res.status(401).json(err)
        })
       
    }
    catch(err){
        console.log(err)
        console.log("check 4",err)
        return res.status(500).json("User not Authorize")
    }
}
module.exports=Auth