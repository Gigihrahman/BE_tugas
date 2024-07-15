import "dotenv/config";
import Midtrans from "midtrans-client";
import Product from "../models/ProductModel.js";
import Payment from "../models/Payment.js";
import ItemDetail from "../models/Itemdetails.js";
import { uuid } from "uuidv4";
import { cekCost } from "../coba.js";

const key = process.env.SERVER_KEY;
let snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: "SB-Mid-server-Z0rvNu6HVUeHLkPVbFWgDzHt",
});
export const order = async (req, res) => {
  try {
    const { cart, destination, id } = req.body;
    const status = "Pending";
    // id harusnya diganti data dari jwt decode
    console.log(cart);
    console.log(key + "ini keynya");
    const item_details = await item_detail(cart);
    console.log(item_details);
    const total_prices = await calculateTotal(cart);
    console.log(total_prices);
    const id_transaction = uuid();
    const totalWeight = await calculateTotalWeight(cart);
    const costOngkir = await cekCost(totalWeight, destination);
    const endPrice = costOngkir + total_prices;

    let parameter = {
      transaction_details: {
        order_id: id_transaction,
        gross_amount: total_prices,
      },
    };

    item_details.map(async (data) => {
      await ItemDetail.create({
        payment_id: id_transaction,
        product_id: id,
        quantity: data.quantity * data.quantity,
        total_price: data.price,
      });
    });

    const token = await snap.createTransactionToken(parameter);
    await Payment.create({
      id: id_transaction,
      user_id: id, // id harusnya diganti data dari jwt decode
      gross_amount: endPrice,
      transaction_status: status,
      token: token,
    });
    console.log(token);
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
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
