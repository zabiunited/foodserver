const jwt=require('jsonwebtoken')
const Customer=require('./database/Customer')

const Auth=async(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ")[1]
        const find=jwt.verify(token,'zabi')
        await Customer.findById(find.data._id)
        .then(data=>{
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
        return res.status(500).json("User not Authorize")
    }
}
module.exports=Auth