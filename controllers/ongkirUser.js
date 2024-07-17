import { jwtDecode } from "jwt-decode";
import User from "../models/userModel.js";
import { cekCost } from "./cekCost.js";
import Product from "../models/ProductModel.js";
import path from "path";
import fs from "fs";

export const ongkir = async (req, res, next) => {
  try {
    const cart = req.body.cart;

    console.log(cart + " ini cartnya");
    const token = req.headers["token"];
    console.log(req.headers);
    console.log(token);
    const decoded = jwtDecode(token);
    const idUser = decoded.id;
    const totalWeight = await calculateTotalWeight(cart);
    console.log(totalWeight);
    const destinasi = await User.findOne({ where: { id: idUser } });
    const subdistrict = destinasi.subdistricts_code;
    console.log(destinasi.subdistricts_code);
    const costOngkir = await cekCost(totalWeight, subdistrict);
    console.log(costOngkir);

    res.status(200).json({ costOngkir });
  } catch (error) {
    console.log("Error calculating shipping cost:", error);
    // Send an error response with appropriate status code (e.g., 500 Internal Server Error)
    res.status(401).json({ message: error });
  }
};

async function calculateTotalWeight(cart) {
  // Consolidate the cart to handle duplicate ids
  const consolidatedCart = cart.reduce((acc, item) => {
    const existingItem = acc.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      existingItem.qty += item.qty;
    } else {
      acc.push(item);
    }
    return acc;
  }, []);

  // Calculate the sum
  const sum = await consolidatedCart.reduce(async (accPromise, item) => {
    const acc = await accPromise;
    const product = await Product.findOne({ where: { id: item.id } });
    return acc + product.berat * item.qty;
  }, Promise.resolve(0));

  return sum;
}
