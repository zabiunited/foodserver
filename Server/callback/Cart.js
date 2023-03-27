const Cart = require('../database/Cart')
const Shiped = require('../database/Shiped')
const Product = require('../database/Product')
const { default: mongoose } = require('mongoose')

const AddCart = async (req, res) => {
    try {
        const { quantity, price, product_id, customer_id } = req.body
        await Cart.findOne({ customer_id: customer_id, product_id: product_id })
            .then(async (data) => {
                if (data == null) {
                    await Cart.create(req.body)
                        .then(async (data) => {
                            await Shiped.findOne({ customer_id: customer_id })
                                .then(async (data) => {
                                    if (data == null) {
                                        await Shiped.create({
                                            "totalProduct": 1,
                                            "totalPrice": price * quantity,
                                            "shipedTax": 200,
                                            "finalPrice": 200 + (price * quantity),
                                            "customer_id": customer_id
                                        })
                                            .then(data => {
                                                return res.status(200).json("Done")
                                            })
                                            .catch(err => {
                                                return res.status(401).json(err)
                                            })
                                    }
                                    else {
                                        let total = data.totalProduct + 1
                                        let pri = data.totalPrice + (price * quantity)
                                        await Shiped.findOneAndUpdate(data._id.toString(), {
                                            "totalProduct": total,
                                            "totalPrice": pri,
                                            "shipedTax": total * 200,
                                            "finalPrice": (total * 200) + pri,
                                            "customer_id": customer_id
                                        })
                                            .then(data => {
                                                return res.status(200).json("Done")
                                            })
                                            .catch(err => {
                                                return res.status(401).json(err)
                                            })
                                    }
                                })

                        })
                        .catch(err => {
                            return res.status(401).json(err)
                        })
                }
                else {

                    const quna = parseInt(data.quantity) + parseInt(quantity)
                    // return res.status(401).json("dsdkj")
                    await Cart.findByIdAndUpdate(data._id.toString(), { "quantity": quna })
                        .then(async (data) => {
                            await Shiped.findOne({ customer_id: customer_id })
                                .then(async (data) => {
                                    let pri = data.totalPrice + (price * quantity)
                                    await Shiped.findByIdAndUpdate(data._id.toString(), {
                                        "totalPrice": pri,
                                        "finalPrice": data.shipedTax + pri
                                    })
                                        .then(data => {
                                            return res.status(200).json("Done")
                                        })
                                        .catch(err => {
                                            return res.status(401).json(err)
                                        })
                                })
                        })
                        .catch(err => {
                            return res.status(401).json(err)
                        })
                }
            })
            .catch(err => {
                return res.status(401).json(err)
            })
    }
    catch (err) {
        return res.status(500).json(err)
    }
}

const CustomerListCart = async (req, res) => {
    try {
        const { id } = req.params
        await Cart.find({ customer_id: id })
            .then(async (data) => {
                let array = []
                const product = data.map(async (arr) => {
                    await Product.findById(arr.product_id)
                        .then(pdata => {
                            array.push({
                                title: pdata.title,
                                price: pdata.price,
                                quantity: arr.quantity,
                                image: pdata.image,
                                cart_id:arr._id
                            })
                            console.log(array)
                        })
                        .catch(err => {
                            console.log("no")
                            return res.status(401).json(err)
                        })
                })
                
                await Shiped.findOne({ customer_id: id })
                    .then(sdata => {
                        return res.status(200).json({ products: array, shiped: sdata })
                    })
                    .catch(err => {
                        return res.status(401).json(err)
                    })
            })
            .catch(err => {
                return res.status(401).json(err)
            })
    }
    catch (err) {
        return res.status(500).json(err)
    }
}

const UpdateCart = async (req, res) => {
    try {
        const { id } = req.params
        const { price, quantity, customer_id } = req.body
        await Cart.findById(id)
            .then(async (data) => {

                var fun = quantity == "INC" ? parseInt(data.quantity) + 1 : parseInt(data.quantity) - 1
                await Cart.findByIdAndUpdate(id, { "quantity": fun })
                    .then(async (data) => {
                        await Shiped.findOne({ customer_id: customer_id })
                            .then(async (data) => {
                                let pri = quantity == "INC" ? data.totalPrice + price : data.totalPrice - price
                                await Shiped.findOneAndUpdate(data._id.toString(), {
                                    "totalPrice": pri,
                                    "finalPrice": data.shipedTax + pri
                                })
                                    .then(data => {
                                        return res.status(200).json("Done")
                                    })
                                    .catch(err => {
                                        return res.status(401).json(err)
                                    })
                            })
                    })
                    .catch(err => {
                        return res.status(401).json("Something wrong")
                    })
            })
            .catch(err => {
                return res.status(401).json("Id not matched")
            })
    }
    catch (err) {
        return res.status(500).json(err)
    }
}

const DeleteCart = async (req, res) => {
    try {
        const { id } = req.params
        await Cart.findByIdAndDelete(id)
            .then(async (data) => {
                let total = data.quantity * data.price
                await Shiped.findOne({ customer_id: data.customer_id.toString() })
                    .then(async (data) => {
                        let pri = data.totalPrice - total
                        await Shiped.findByIdAndUpdate(data._id.toString(), {
                            "totalProduct": data.totalProduct - 1,
                            "totalPrice": pri,
                            "shipedTax": data.shipedTax - 200,
                            "finalPrice": (data.shipedTax - 200) + pri
                        })
                            .then(data => {
                                return res.status(200).json("Done")
                            })
                            .catch(err => {
                                return res.status(401).json(err)
                            })

                    })
                    .catch(err => {
                        return res.status(401).json(err)
                    })
            })
            .catch(err => {
                return res.status(401).json("Cart is not matched")
            })
    }
    catch (err) {
        return res.status(500).json(err)
    }
}

module.exports = { AddCart, CustomerListCart, UpdateCart, DeleteCart }