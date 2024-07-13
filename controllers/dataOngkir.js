// server.js

import axios from 'axios'
import "dotenv/config";

const API_KEY = process.env.API_ONGKIR_KEY;


export const province = async (req, res) => {
  try {
    const response = await axios.get(
      "https://pro.rajaongkir.com/api/province",
      {
        headers: { key: API_KEY },
      }
    );
    res.json(response.data.rajaongkir.results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const city = async (req, res) => {
  try {
    const { province } = req.query;
    const response = await axios.get(
      `https://pro.rajaongkir.com/api/city?province=${province}`,
      {
        headers: { key: API_KEY },
      }
    );
    res.json(response.data.rajaongkir.results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const subdistrict =  async (req, res) => {
  try {
    const { city } = req.query;
    const response = await axios.get(
      `https://pro.rajaongkir.com/api/subdistrict?city=${city}`,
      {
        headers: { key: API_KEY },
      }
    );
    res.json(response.data.rajaongkir.results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const cost = async(from,destiny)=>{
  try {

    const body = {
      origin: from,
      originType: "subdistrict",
      destination: destiny,
      destinationType: "subdistrict",
      weight: 1700,
      courier: "jne",
    };
    const response = await axios.get(
      `https://pro.rajaongkir.com/api/subdistrict?city=${city}`,
      {
        headers: { key: API_KEY },
        form:{body}
      }
      
    );
    console.log(response);
  } catch (error) {
    console.log(error)
  }
}
