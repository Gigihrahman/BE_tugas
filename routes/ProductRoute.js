import express from "express";
import {
  getProducts,
  getProductById,
  saveProduct,
  updateProduct,
  deleteProduct,
  getProductCart,
  getProductByMerk,
} from "../controllers/ProductController.js";
import {
  editProfileUser,
  getUserByid,
  login,
  logout,
  register,
} from "../controllers/user.js";
import { order } from "../controllers/Order.js";
import { province, city, subdistrict } from "../controllers/dataOngkir.js";
import {
  deleteMerk,
  getMerk,
  getMerkByid,
  saveMerk,
  updateMerk,
} from "../controllers/getMerk.js";
import { ongkir } from "../controllers/ongkirUser.js";
import {
  detailPaymentUser,
  historyPaymentUser,
  detailPaymentAdmin,
  historyPaymentAdmin,
  notifPaymentAdmin,
} from "../controllers/historyPayment.js";
import { loginAdmin } from "../controllers/admin.js";
const router = express.Router();
//product
router.get("/products", getProducts);
router.post("/productsview", getProducts);
router.get("/products/:id", getProductById);
router.post("/products", saveProduct);
router.patch("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);
router.post("/productscart", getProductCart);
router.get("/productmerk", getProductByMerk);

//user
router.post("/login", login);
router.delete("/logout", logout);
router.post("/register", register);
router.patch("/user", editProfileUser);
router.get("/userid", getUserByid);

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
router.get("/merk", getMerk);
router.get("/merk/:id", getMerkByid);
router.post("/merk", saveMerk);
router.patch("/merk/:id", updateMerk);
router.patch("/merk", updateMerk);
router.delete("/merk/:id", deleteMerk);
router.post("/admin", loginAdmin);

router.post("/notif", notifPaymentAdmin);



export default router;