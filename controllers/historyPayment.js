import Payment from "../models/Payment.js";
import { jwtDecode } from "jwt-decode";
import ItemDetail from "../models/Itemdetails.js";

export const historyPaymentUser = async (req, res) => {
  try {
    const token = req.headers["token"];
    const decoded = jwtDecode(token);
    const idUser = decoded.id;
    const data = await Payment.findAll({ where: { user_id: idUser } });
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ message: "data not found" });
  }
};

export const detailPaymentUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await ItemDetail.findAll({ where: { id: id } });
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ message: "data not found" });
  }
};
