const Customer = require('../database/Customer')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const Signup = async (req, res) => {
    try {
        const { email } = req.body
        await Customer.findOne({email:email})
            .then(async (data) => {
                if (data == null) {
                    await Customer.create(req.body)
                        .then(data => {
                            const token = jwt.sign({ data }, process.env.TOKEN)
                            return res.status(200).json(token)
                        })
                        .catch(err => {
                            console.log(err)
                            return res.status(401).json(err)
                        })
                }
                else{
                    return res.status(400).json("Customer already exist")
                }
                // return res.status(400).json(data)
            })
            .catch(err => {
                return res.status(401).json(err)
            })

    }
    catch (err) {
        return res.status(500).json(err)
    }
}

const Login = async (req, res) => {
    const { email, password } = req.body
    await Customer.findOne({ email: email })
        .then((data) => {
            if (data == null) {
                return res.status(400).json("Email is not exist..")
            }
            if (data.password == password) {
                const token = jwt.sign({ data }, process.env.TOKEN)
                return res.status(200).json(token)
            }
            else {
                return res.status(400).json("Password is not match")
            }
        })
        .catch(err => {
            return res.status(401).json(err)
        })
}
module.exports = { Signup, Login }