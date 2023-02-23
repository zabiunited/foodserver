const mongoose = require('mongoose')

const Connection = async () => {
    const Connect = await mongoose.connect('mongodb+srv://Zabi:23_MongoDb_23@productmanagmentsystem.nsyfr3v.mongodb.net/?retryWrites=true&w=majority')
    if(Connect){
        console.log("Database connection build")
    }
}
module.exports=Connection