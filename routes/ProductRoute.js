import express from "express";
import {
    getProducts,
    getProductById,
    saveProduct,
    updateProduct,
    deleteProduct,
    getProductBycategori
} from "../controllers/ProductController.js";
import{login,logout,register} from "../controllers/user.js"
import {order} from "../controllers/Order.js"
import { province, city, subdistrict } from "../controllers/dataOngkir.js";
import { getMerk } from "../controllers/getMerk.js";
const router = express.Router();

router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/products', saveProduct);
router.patch('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);
//merk
router.get('/merk',getMerk)

router.post("/login", login)
router.delete("/logout",logout)
router.post('/register',register)
router.post('/order',order)

//routing alamat
router.get('/provinces',province)
router.get('/cities',city)
router.get('/subdistricts',subdistrict)
// router.get('/products/category',getProductBycategori)

export default router;