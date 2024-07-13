import "dotenv/config";
import axios from "axios";
const API_KEY= process.env.API_ONGKIR_KEY;
axios.defaults.baseURL = "https://pro.rajaongkir.com/api/";
axios.defaults.headers.common["key"] = API_KEY;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

const cobain = async()=>{


const response = await axios.post(`https://pro.rajaongkir.com/api/cost`,{
    origin: 501,
    originType: "city",
    destination: 114,
    destinationType:"subdistrict",
    weight:1700,
    courier: "jne"
});
// console.log(response.data.rajaongkir)
console.log(response.data.rajaongkir.results[0].costs[1].cost[0].value)
}
// Contoh penggunaan fungsi
cobain()