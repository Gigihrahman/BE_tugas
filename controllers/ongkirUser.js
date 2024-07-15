import { jwtDecode } from "jwt-decode";
import User from "../models/userModel.js";
import { cekCost } from "./cekCost.js";

export const ongkir = async (req, res) => {
  const cart = req.body.cart;
  const token = req.headers["token"];
  const decoded = jwtDecode(token);
  const idUser = decoded.id;
  const totalWeight = calculateTotalWeight(cart);
  const destinasi = await User.findOne({ where: { id: idUser } });
  const costOngkir = await cekCost(totalWeight, destinasi.subdistricts_code);
  res.status(200).JSON({ costOngkir: costOngkir });
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
