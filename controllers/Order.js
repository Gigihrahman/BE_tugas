import "dotenv/config";
import Midtrans from "midtrans-client";
import { Product } from "../models/allModel.js";
import { Payment } from "../models/allModel.js";
import { ItemDetail } from "../models/allModel.js";
import { uuid } from "uuidv4";
import { cekCost } from "../coba.js";
import { jwtDecode } from "jwt-decode";
import { User } from "../models/allModel.js";
import db from "../config/Database.js";
const sequelize = db;

const key = process.env.SERVER_KEY;
let snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: "SB-Mid-server-Z0rvNu6HVUeHLkPVbFWgDzHt",
});
export const order = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { cart } = req.body;
    const tokenUser = req.headers["token"];

    await purchaseProducts(cart, transaction, res);

    const decoded = jwtDecode(tokenUser);
    const idUser = decoded.id;
    const destinasi = await User.findOne({ where: { id: idUser } });
    const status = "Pending";
    // id harusnya diganti data dari jwt decode
    console.log(cart);
    const subdistricts = destinasi.subdistricts_code;
    const item_details = await item_detail(cart);
    console.log(item_details);
    const total_prices = await calculateTotal(cart);
    console.log(total_prices);
    const id_transaction = uuid();
    const totalWeight = await calculateTotalWeight(cart);
    const costOngkir = await cekCost(totalWeight, subdistricts);
    const endPrice = costOngkir + total_prices;

    let parameter = {
      transaction_details: {
        order_id: id_transaction,
        gross_amount: total_prices,
      },
    };

    const tokenPay = await snap.createTransactionToken(parameter);
    const payments = await Payment.create(
      {
        id: id_transaction,
        user_id: idUser, // id harusnya diganti data dari jwt decode
        gross_amount: endPrice,
        transaction_status: status,
        token: tokenPay,
      },
      { transaction }
    );
    console.log(payments);
    item_details.map(
      async (data) => {
        await ItemDetail.create({
          payment_id: id_transaction,
          product_id: data.id,
          quantity: data.quantity * data.quantity,
          total_price: data.price,
        });
      },
      { transaction }
    );
    console.log(tokenPay);
    await transaction.commit();
    res.status(200).json({ tokenPay });
  } catch (error) {
    await transaction.rollback();

    console.log(`ini error` + error);
    res.status(400).json({ message: error.message });
  }
};

const item_detail = async (cart) => {
  try {
    // Use Promise.all to handle an array of promises
    const details = await Promise.all(
      cart.map(async (data) => {
        const product = await Product.findOne({ where: { id: data.id } });
        return {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: data.qty,
        };
      })
    );
    return details;
  } catch (error) {
    console.error(error);
  }
};

async function calculateTotal(cart) {
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
    return acc + product.price * item.qty;
  }, Promise.resolve(0));

  return sum;
}

///calculate total weight
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

async function purchaseProducts(cart, transaction, res) {
  for (const item of cart) {
    const productId = item.id;
    const quantity = item.qty;

    // Lock the product row for update
    const product = await Product.findByPk(productId, {
      // lock: true,
      transaction,
    });

    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
      return;
    }

    if (product.stock < quantity) {
      console.log(product);
      throw new Error(` ${product.name} stok kosong`);
      return;
    }

    // Update stock after successful validation
    await product.decrement("stock", { by: quantity, transaction });
  }

  // All validations and updates successful, commit the transaction

  return { message: "Purchase successful" };
}
