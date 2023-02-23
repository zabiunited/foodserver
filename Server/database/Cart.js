const {model,Schema}=require('mongoose')

const Cart=new Schema({
    quantity:Number,
    price:Number,
    product_id:{
        type:Schema.Types.ObjectId,
        ref:"Product"
    },
    customer_id:{
        type:Schema.Types.ObjectId,
        ref:"Customer"
    }
})

module.exports=model("Cart",Cart)
