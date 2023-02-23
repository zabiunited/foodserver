const {model,Schema}=require('mongoose')

const product=new Schema({
    active:Boolean,
    title:String,
    image:String,
    description:String,
    // stock:Number,
    price:Number,
    catagry_id:{
        type:Schema.Types.ObjectId,
        ref:'Catagry'
    }
    // type:Number,
    // option:{
    //     colors:[{color:String}],
    //     sizes:[{size:String}],
    // }
})

module.exports=model("Product",product)