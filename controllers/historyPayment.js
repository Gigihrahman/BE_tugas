import { Payment } from "../models/allModel.js";
import { jwtDecode } from "jwt-decode";
import { ItemDetail } from "../models/allModel.js";
import { Product } from "../models/allModel.js";

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
  const id = req.params.id;
  const data = await Payment.findAll({
    where: {
      id: id,
    },
    include: {
      model: ItemDetail,
      as: "itemDetails",
      include: {
        model: Product,
      },
    },
  });
  console.log(data);

  res.status(200).json({ data });
};
