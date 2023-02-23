const {model,Schema}=require('mongoose')

const OrderProduct=new Schema({
    quantity:Number,
    price:Number,
    product_id:{
        type:Schema.Types.ObjectId,
        ref:"Product"
    },
    order_id:{
        type:Schema.Types.ObjectId,
        ref:"Order"
    }
})

module.exports=model("OrderProduct",OrderProduct)
