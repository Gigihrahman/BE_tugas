import Product from "./models/ProductModel.js";
import { cekCost } from "./coba.js";

const cart = [
  { id: 4, qty: 5 },
  { id: 5, qty: 2 },
  { id: 5, qty: 1 },
];

// const item_details = async () => {
//   try {
//     // Use Promise.all to handle an array of promises
//     const details = await Promise.all(
//       cart.map(async (data) => {
//         const product = await Product.findOne({ where: { id: data.id } });
//         return {
//           id: product.id,
//           name: product.name,
//           price: product.price * data.qty,
//           qty: data.qty,
//         };
//       })
//     );
//     return details;
//   } catch (error) {
//     console.error(error);
//   }
// };

// async function dicoba() {
//   const cobain = await transaction_detail();
//   console.log(cobain)
// }
// dicoba()
// Execute the function and log the result
// transaction_detail()
// .then((details) => console.log(details))
// .catch((err) => console.error(err));

// Create an asynchronous function to handle the summation
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

// Calculate the sum and log it
// calculateTotal(cart)
//   .then((sum) => console.log(sum))
//   .catch((err) => console.error(err))

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

const totalAll = async (cart) => {
  try {
    const destiny = 114;
    const totalWeight = await calculateTotalWeight(cart);
    const costall = await cekCost(totalWeight, destiny);
    const totalPrice = await calculateTotal(cart);
    const endPrice = totalPrice + costall;
    console.log(endPrice);
  } catch (error) {
    console.log(error);
  }
};
// const cek = cekCost(totalWeight, 114);
totalAll(cart);