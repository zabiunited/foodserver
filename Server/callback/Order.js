const Cart = require('../database/Cart')
const Order = require('../database/Order')
const OrderProduct = require('../database/OrdreProduct')
const Shiped = require('../database/Shiped')

const AddOrder = async (req, res) => {
    try {
        const { customer_id } = req.body
        await Order.create(req.body)
            .then(async (orderData) => {
                await Cart.find({ customer_id: customer_id })
                    .then(async (data) => {
                        var arr = []
                        var cart_arr = []
                        data.forEach(element => {
                            cart_arr.push(element._id.toString())
                            arr.push({
                                "quantity": element.quantity,
                                "price": element.price,
                                "customer_id": element.customer_id.toString(),
                                "order_id": orderData._id.toString()
                            })
                        });
                        await OrderProduct.insertMany(arr)
                            .then(async (data) => {
                                await Cart.deleteMany({ _id: cart_arr })
                                    .then(async (data) => {
                                        await Shiped.findOneAndDelete({ customer_id: customer_id })
                                            .then(data => {
                                                return res.status(200).json("Done")
                                            })
                                            .catch(err => {
                                                res.status(401).json(err)
                                            })
                                    })
                                    .catch(err => {
                                        res.status(401).json()
                                    })
                            })
                            .catch(err => {
                                res.status(401).json("not Delete")
                            })

                    })
                    .catch(err => {
                        res.status(401).json("Not")
                    })
            })
    }
    catch (err) {
        return res.status(500).json(err)
    }
}

const OrderList = async (req, res) => {
    try {
        const { id } = req.params
        await Order.find({ customer_id: id })
            .then(async (data) => {
                var order=[]
                // res.status(200).json("Not")
                await data.forEach(async(e) => {
                    await OrderProduct.find({order_id:e._id.toString()})
                    .then(data=>{
                        order.push({
                            status:e.status,
                            total:e.total,
                            date:e.updatedAt,
                            products:data
                        })
                    })
                    .catch(err => {
                        res.status(401).json("Not")
                    })
                    return res.status(200).json(order)
                });
            })
            .catch(err => {
                res.status(401).json("Not")
            })
    }
    catch (err) {
        return res.status(500).json(err)
    }
}

module.exports = { AddOrder, OrderList }