const {model,Schema}=require('mongoose')

const Shiped=new Schema({
    totalProduct:Number,
    totalPrice:Number,
    shipedTax:Number,
    finalPrice:Number,
    customer_id:{
        type:Schema.Types.ObjectId,
        ref:"Customer"
    }
})

module.exports=model("Shiped",Shiped)

