import express from "express";
import {
  getProducts,
  getProductById,
  saveProduct,
  updateProduct,
  deleteProduct,
  getProductBycategori,
  getProductCart,
} from "../controllers/ProductController.js";
import { login, logout, register } from "../controllers/user.js";
import { order } from "../controllers/Order.js";
import { province, city, subdistrict } from "../controllers/dataOngkir.js";
import { getMerk, saveMerk, updateMerk } from "../controllers/getMerk.js";
import { ongkir } from "../controllers/ongkirUser.js";
import {
  detailPaymentUser,
  historyPaymentUser,
  detailPaymentAdmin,
  historyPaymentAdmin,
} from "../controllers/historyPayment.js";
const router = express.Router();

router.get("/products", getProducts);
router.post("/productsview", getProducts);
router.get("/products/:id", getProductById);
router.post("/products", saveProduct);
router.patch("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);
router.post("/productscart", getProductCart);

//merk
router.get("/merk", getMerk);

router.post("/login", login);
router.delete("/logout", logout);
router.post("/register", register);
router.post("/order", order);

//ongkir
router.post("/ongkir", ongkir);

//routing alamat
router.get("/provinces", province);
router.get("/cities", city);
router.get("/subdistricts", subdistrict);
// router.get('/products/category',getProductBycategori)

//payment history
router.get("/paymentuser", historyPaymentUser);
router.post("/detailPaymentUser/:id", detailPaymentUser);

router.get("/paymentadmin", historyPaymentAdmin);
router.post("/detailPaymentAdmin/:id", detailPaymentAdmin);

//merk
router.post("/merk", saveMerk);
router.patch("/merk/:id", updateMerk);


export default router;