const { model, Schema } = require('mongoose')

const Customer = new Schema({
    first_name: String,
    second_name: String,
    email: String,
    password: String,
    address:[{
        address: String,
        state: String,
        phone_no: Number,
        city: String,
        country: String
    }]

})
module.exports = model("Customer", Customer)