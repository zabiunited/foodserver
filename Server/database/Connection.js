const mongoose = require('mongoose')
require('dotenv').config()
const Connection = async () => {
    mongoose.set('strictQuery',false)
    const Connect = await mongoose.connect(process.env.MONGO_DB_URL)
    if(Connect){
        console.log("Database connection build")
    }
}
module.exports=Connection
