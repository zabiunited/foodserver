const {model,Schema}=require('mongoose')

const Order=new Schema({
    status:String,
    total:Number,
    customer_id:{
        type:Schema.Types.ObjectId,
        ref:"Customer"
    }
},{timestamps:true})

module.exports=model("Order",Order)
