import "dotenv/config";
import axios from "axios";
const API_KEY = process.env.API_ONGKIR_KEY;
axios.defaults.baseURL = "https://pro.rajaongkir.com/api/";
axios.defaults.headers.common["key"] = API_KEY;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
const originType = process.env.ORIGIN_TYPE;
const originAddress = process.env.ORIGIN_ADDRESS;

export const cekCost = async (weights, destiny) => {
  const response = await axios.post(`https://pro.rajaongkir.com/api/cost`, {
    origin: originAddress,
    originType: originType,
    destination: destiny,
    destinationType: "subdistrict",
    weight: weights,
    courier: "jne",
  });
  // console.log(response.data.rajaongkir)
  console.log(response.data.rajaongkir.results[0].costs[1].cost[0].value);
  return response.data.rajaongkir.results[0].costs[1].cost[0].value;
};
