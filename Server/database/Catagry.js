const {model,Schema}=require('mongoose')

const Catagry=new Schema({
    active:Boolean,
    title:String,
    image:String,
})

module.exports=model("Catagry",Catagry)
