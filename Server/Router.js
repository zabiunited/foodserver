const express = require('express')
const router = express.Router()
const Auth = require('./Auth')
const { Signup, Login } = require('./callback/Customer')
const { AddProduct, ListProduct, UpdateProduct, DeleteProduct, CatagryListProduct } = require('./callback/Product')
const { AddCatagry, ListCatagry, UpdateCatagry, DeleteCatagry } = require('./callback/Catagry')
const { AddCart, CustomerListCart, UpdateCart, DeleteCart } = require('./callback/Cart')
const { AddOrder, OrderList } = require('./callback/Order')

//user
router.post("/login", Login)
router.post("/signup", Signup)

//product
router.post("/addproduct", Auth, AddProduct)
router.get("/listproduct/:list", ListProduct)
router.get("/catagry_product/:id/:list", CatagryListProduct)
router.put("/updateproduct/:id", Auth, UpdateProduct)
router.delete("/deleteproduct/:id", Auth, DeleteProduct)

//catagary
router.post("/addcatagry", Auth, AddCatagry)
router.get("/listcatagry", ListCatagry)
router.put("/updatecatagry/:id", Auth, UpdateCatagry)
router.delete("/deletecatagry/:id", Auth, DeleteCatagry)

//cart
router.post("/addcart", Auth, AddCart)
router.get("/listcart/:id", Auth, CustomerListCart)
router.put("/updatecart/:id", Auth, UpdateCart)
router.delete("/deletecart/:id", Auth, DeleteCart)

//order
router.post("/addorder", Auth, AddOrder)
router.get("/orderlist/:id", Auth, OrderList)

module.exports = router