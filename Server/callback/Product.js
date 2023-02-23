const Product = require('../database/Product')

const AddProduct = async (req, res) => {
    try {
        const { title } = req.body
        await Product.findOne({ title: title })
            .then(async (data) => {
                if (data != null) {
                    return res.status(400).json("This product is already exist")
                }
                await Product.create(req.body)
                    .then(data => {
                        return res.status(200).json(data)
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

const ListProduct = async (req, res) => {
    try {
        const { list } = req.params
        const limit = list * 10
        const skip = (list - 1) * 10
        await Product.find().limit(limit).skip(skip)
            .then(data => {
                return res.status(200).json(data)
            })
            .catch(err => {
                return res.status(401).json(err)
            })
    }
    catch (err) {
        return res.status(500).json(err)
    }
}

const UpdateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { title } = req.body
        await Product.findOne({ title: title })
            .then(async (data) => {
                if (data === null || data._id.toString() == id) {
                    await Product.findByIdAndUpdate(id, req.body)
                        .then(data => {
                            return res.status(200).json(data)
                        })
                        .catch(err => {
                            return res.status(401).json(err)
                        })
                }
                else{
                    return res.status(400).json("This product is already exist")
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

const DeleteProduct = async (req, res) => {
    const { id } = req.params
    await Product.findByIdAndDelete(id)
        .then(data => {
            return res.status(200).json(data)

        })
        .catch(err => {
            return res.status(401).json(err)
        })
}

module.exports = { AddProduct, ListProduct, UpdateProduct, DeleteProduct }